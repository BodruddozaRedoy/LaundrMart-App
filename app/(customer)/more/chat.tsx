import HeaderBackButton from "@/components/common/HeaderBackButton";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/axios";
import { connectChatSocket, disconnectChatSocket, sendChatMessage } from "@/lib/chatSocket";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList, Image,
  Modal,
  Platform, StatusBar, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

/* =====================
   TYPES
===================== */
interface ChatMessage {
  id: number;
  text: string | null;
  sender: number;
  file: string | null;
  created_at: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ImageViewer = ({
  visible,
  uri,
  onClose,
}: {
  visible: boolean;
  uri: string | null;
  onClose: () => void;
}) => {
  if (!uri) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} />
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-4 right-4 z-20 mt-5"
        >
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        {/* Image Container */}
        <View className="flex-1 justify-center items-center px-4">
          <Image
            source={{ uri }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: SCREEN_HEIGHT * 0.75, // ✅ REQUIRED
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};



const MessageItem = React.memo(
  ({
    item,
    myUserId,
    onImagePress,
  }: {
    item: ChatMessage;
    myUserId: number;
    onImagePress: (uri: string) => void;
  }) => {
    const isMe = item.sender === myUserId;

    return (
      <View
        className={`flex-row ${isMe ? "justify-end" : "justify-start"
          } mb-3 px-2`}
      >
        <View
          className={`max-w-[75%] p-3 rounded-2xl ${isMe ? "bg-primary" : "bg-gray-100"
            }`}
        >
          {item.text && (
            <Text
              className={`text-sm ${isMe ? "text-white" : "text-gray-800"
                }`}
            >
              {item.text}
            </Text>
          )}

          {item.file && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onImagePress(item.file!)}
              className="mt-2"
            >
              <Image
                source={{ uri: item.file }}
                className="w-full rounded-xl"
                style={{ aspectRatio: 1 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

MessageItem.displayName = "MessageItem";


const ChatScreen = () => {
  const { roomId, receiverName, receiverImage } = useLocalSearchParams<{
    roomId: string;
    receiverName: string;
    receiverImage: string;
  }>();

  const listRef = useRef<FlatList>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);


  // DYNAMIC USER ID
  const { customerProfile } = useUser()
  const MY_USER_ID = customerProfile?.id || 0;

  // LOAD HISTORY
  const { data: history = [] } = useQuery<ChatMessage[]>({
    queryKey: ["chat", roomId],
    queryFn: async () => {
      const res = await api.get(`/message/api/message/${roomId}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // WEBSOCKET
  useEffect(() => {
    let active = true;
    const initSocket = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;
      connectChatSocket(Number(roomId), token, (data) => {
        if (active && data?.type === "chat_message" && data?.message) {
          setLiveMessages((prev) => [data.message, ...prev]);
        }
      });
    };
    initSocket();
    return () => { active = false; disconnectChatSocket(); };
  }, [roomId]);

  const mergedMessages = useMemo(() => {
    const seen = new Set<number>();
    const safeHistory = Array.isArray(history) ? history : [];
    const combined = [...liveMessages, ...safeHistory];
    return combined
      .filter(m => m && m.id && !seen.has(m.id) && seen.add(m.id))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [history, liveMessages]);

  // IMAGE PICKER (Fixed Deprecation)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restoration of previous option
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleImagePress = (uri: string) => {
    setPreviewImage(uri);
    setPreviewVisible(true);
  };


  // SEND LOGIC (Fixed Network Error)
  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return;

    const textToSubmit = message;
    const imageToSubmit = selectedImage;

    setMessage("");
    setSelectedImage(null);

    // 1. Send Text via Socket
    if (textToSubmit.trim()) {
      sendChatMessage({ type: "chat_message", message: textToSubmit });
    }

    // 2. Send Image via REST (Fixed)
    if (imageToSubmit) {
      const formData = new FormData();

      // Get filename from URI
      const filename = imageToSubmit.split('/').pop() || 'upload.jpg';

      // Infer type
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      // Structure correctly for the native bridge
      formData.append("file", {
        uri: imageToSubmit, // Usually better NOT to remove file:// on modern RN
        name: filename,
        type: type,
      } as any);

      try {
        await api.post(`/message/api/message/${roomId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Force multipart
          },
          // Important for large uploads
          transformRequest: (data) => data,
        });
      } catch (e: any) {
        console.error("Upload error details:", e?.response?.data || e.message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100 bg-white">
          <HeaderBackButton onPress={() => router.back()} />
          <Image
            source={{ uri: receiverImage || "https://via.placeholder.com/150" }}
            className="w-10 h-10 rounded-full ml-3 bg-gray-200"
          />
          <Text className="ml-3 font-semibold text-lg">{receiverName || "Chat"}</Text>
        </View>

        <FlatList
          ref={listRef}
          data={mergedMessages}
          inverted
          keyExtractor={(item) => `msg-${item.id}`}
          renderItem={({ item }) =>
            <MessageItem
              item={item}
              myUserId={MY_USER_ID as number}
              onImagePress={handleImagePress}
            />}
          contentContainerStyle={{ padding: 10 }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />

        <View className="border-t border-gray-100 bg-white pb-2">
          {selectedImage && (
            <View className="px-5 py-2">
              <View className="w-24 h-24 relative">
                <Image source={{ uri: selectedImage }} className="w-24 h-24 rounded-xl" />
                <TouchableOpacity
                  onPress={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-gray-500 rounded-full p-1"
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View className="flex-row items-center px-4 py-3">
            <TouchableOpacity onPress={pickImage} className="mr-3">
              <Ionicons name="image-outline" size={28} color="#007AFF" />
            </TouchableOpacity>

            <TextInput
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
              className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 min-h-[40] max-h-32 text-base"
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!message.trim() && !selectedImage}
              className={`ml-3 p-3 rounded-full ${(!message.trim() && !selectedImage) ? 'bg-gray-300' : 'bg-primary'}`}
            >
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ImageViewer
        visible={previewVisible}
        uri={previewImage}
        onClose={() => setPreviewVisible(false)}
      />

    </SafeAreaView>
  );
};

export default ChatScreen;