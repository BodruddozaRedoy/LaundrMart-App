import PrimaryButton from '@/components/shared/PrimaryButton';
import { images } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ForgetPasswordScreen: React.FC = () => {
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

      {/* Heading */}
      <Text className="text-3xl font-bold text-[#1E293B] mt-6">
        Forgot Password
      </Text>
      <Text className="text-center text-[#64748B] mt-2 mb-6 leading-5 px-5">
        Don’t worry! It happens. Please enter the Email and we will send the OTP
        in this Email.
      </Text>

      {/* Illustration */}
      <View className="w-72 h-64 mb-6">
        <Image
          source={images.ForgetPassIllustration}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Email Input */}
      <View className="w-full mb-8">
        <Text className="mb-2 font-semibold text-[#64748B]">
          Enter Email / Phone Number
        </Text>
        <TextInput
          placeholder="ahmadjubayerr@gmail.com"
          className="py-4 px-5 rounded-lg border border-[#D4D3D3] w-full text-[#1E293B]"
          keyboardType="email-address"
        />
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity
        onPress={() => router.push('/(auth)/verify')}
        className="w-full"
      >
        <PrimaryButton text="Send OTP" />
      </TouchableOpacity>

      {/* Send OTP Button */}
      <TouchableOpacity
        onPress={() => router.push('/(auth)/resetPassword')}
        className="w-full mt-5"
      >
        <PrimaryButton text="Reset Password" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgetPasswordScreen;
