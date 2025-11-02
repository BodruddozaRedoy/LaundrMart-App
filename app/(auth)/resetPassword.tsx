import PrimaryButton from '@/components/shared/PrimaryButton';
import { images } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ResetPassScreen: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      }}
      className="bg-white flex-grow"
    >
      {/* Logo */}
      <View className="mt-24 w-60 h-20">
        <Image
          source={images.Logo}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Headings */}
      <Text className="text-3xl font-bold text-[#1E293B] mt-5">
        Set Your Password
      </Text>
      <Text className="text-center text-[#64748B] mt-2 mb-10 leading-5 px-5">
        In order to keep your account safe you need to create a strong password.
      </Text>

      {/* Password Fields */}
      <View className="w-full gap-5">
        {/* Password */}
        <View>
          <Text className="mb-2 font-semibold text-[#64748B]">Password</Text>
          <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
            {/* Lock icon */}
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#94A3B8"
              className="mr-2"
            />
            <TextInput
              placeholder="********"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="flex-1 py-4 text-[#1E293B]"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View>
          <Text className="mb-2 font-semibold text-[#64748B]">
            Confirm Password
          </Text>
          <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
            {/* Lock icon */}
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#94A3B8"
              className="mr-2"
            />
            <TextInput
              placeholder="********"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 py-4 text-[#1E293B]"
            />
            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Ionicons
                name={
                  showConfirmPassword ? 'eye-outline' : 'eye-off-outline'
                }
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        className="w-full mt-10"
      >
        <PrimaryButton text="Confirm" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassScreen;
