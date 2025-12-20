import PrimaryButton from '@/components/shared/PrimaryButton';
import { useToast } from '@/components/ui/toast/ToastContext';
import { images } from '@/constants';
import { useUser } from '@/hooks/useUser';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Errors = {
  identifier?: string;
};

const ForgetPasswordScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const { forgotPassword, forgotPasswordState } = useUser();
  const { success, error } = useToast();

  /* -------------------- VALIDATION -------------------- */
  const validate = () => {
    const e: Errors = {};
    if (!identifier) e.identifier = 'Email or phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------- HANDLER -------------------- */
  const handleSendOtp = async () => {
    if (!validate()) return;

    const payload = identifier.includes('@')
      ? { email: identifier }
      : { phone_number: identifier };

    try {
      const res = await forgotPassword(payload);

      success('OTP Sent', res.message);
      router.replace({
        pathname: '/(auth)/verify',
        params: { email: identifier, action: "forget_pass" }, // reuse same verify screen
      });
    } catch (err: any) {
      error(
        'Failed to send OTP',
        err?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <SafeAreaView className='' style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 70}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              padding: 20,
              flex: 1,
              justifyContent: 'center',
            }}
            className="bg-white"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <View className="mt-10 w-60 h-20">
              <Image
                source={images.Logo}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>

            {/* Heading */}
            <Text className="text-3xl font-bold text-[#1E293B] mt-6">
              Forgot Password
            </Text>
            <Text className="text-center text-[#64748B] mt-2 mb-6 leading-5 px-5">
              Don’t worry! Enter your email or phone number and we’ll send you
              an OTP to reset your password.
            </Text>

            {/* Illustration */}
            <View className="w-72 h-64 mb-6">
              <Image
                source={images.ForgetPassIllustration}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>

            {/* Input */}
            <View className="w-full mb-6">
              <Text className="mb-2 font-semibold text-[#64748B]">
                Enter Email / Phone Number
              </Text>
              <TextInput
                value={identifier}
                onChangeText={(v) => {
                  setIdentifier(v);
                  setErrors({});
                }}
                placeholder="example@email.com or 017XXXXXXXX"
                placeholderTextColor="#94A3B8"
                className="py-4 px-5 rounded-lg border border-[#D4D3D3] text-black"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.identifier && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.identifier}
                </Text>
              )}
            </View>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSendOtp}
              disabled={forgotPasswordState.isPending}
              className="w-full"
            >
              <PrimaryButton
                text={
                  forgotPasswordState.isPending
                    ? 'Sending OTP...'
                    : 'Send OTP'
                }
              />
            </TouchableOpacity>

            {/* Extra spacing */}
            <View className="h-20" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
