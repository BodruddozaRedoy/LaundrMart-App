import { images } from '@/constants';
import React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
    return (
      <ScrollView
          contentContainerStyle={{ alignItems: 'center', padding: 20 }}
          className="bg-white flex-grow"
      >
          {/* Logo */}
          <View className="mt-10 w-40 h-20">
              <Image
                  source={images.Logo}
                  className="w-full h-full"
                  resizeMode="contain"
              />
          </View>

          {/* Headings */}
          <Text className="text-3xl font-bold text-[#475569] mt-2">
              Welcome Back
          </Text>
          <Text className="text-[#64748B] mt-1 mb-10">Login to your account</Text>

          {/* Inputs */}
          <View className="w-full gap-5">
              <View>
                  <Text className="mb-2 font-semibold text-[#64748B]">
                      Enter Email / Phone Number
                  </Text>
                  <TextInput
                      placeholder="ahmadjubayerr@gmail.com"
                      className="py-4 px-5 rounded-lg border border-[#D4D3D3] w-full"
                      keyboardType="email-address"
                  />
              </View>

              <View>
                  <Text className="mb-2 font-semibold text-[#64748B]">Password</Text>
                  <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                      <TextInput
                          placeholder="Type here..."
                          secureTextEntry
                          className="flex-1 py-4"
                      />
                      <Ionicons name="eye-off-outline" size={22} color="#94A3B8" />
                  </View>
              </View>
          </View>

          {/* Remember Me + Forgot Password */}
          <View className="flex-row justify-between items-center w-full mt-3">
              <View className="flex-row items-center">
                  <Ionicons name="checkbox-outline" size={20} color="#2563EB" />
                  <Text className="ml-2 text-[#64748B]">Remember Me</Text>
              </View>
              <TouchableOpacity>
                  <Text className="text-[#2563EB] font-medium">
                      Forgot Password?
                  </Text>
              </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity className="bg-[#2563EB] w-full p-4 rounded-lg mt-6">
              <Text className="text-white text-center text-lg font-semibold">
                  Sign In
              </Text>
          </TouchableOpacity>

          {/* Sign Up link */}
          <View className="flex-row mt-4">
              <Text className="text-[#475569]">Don’t have an account? </Text>
              <TouchableOpacity>
                  <Text className="text-[#2563EB] font-semibold">Sign Up</Text>
              </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-6 w-full">
              <View className="flex-1 h-px bg-[#CBD5E1]" />
              <Text className="mx-2 text-[#94A3B8]">Or</Text>
              <View className="flex-1 h-px bg-[#CBD5E1]" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row w-full justify-between">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-[#D4D3D3] p-3 rounded-lg mr-2">
                  <Image
                      source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Google_Icon.png',
                      }}
                      className="w-5 h-5 mr-2"
                      resizeMode="contain"
                  />
                  <Text className="text-[#475569] font-medium">Google</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-[#D4D3D3] p-3 rounded-lg ml-2">
                  <Ionicons name="logo-apple" size={20} color="black" />
                  <Text className="ml-2 text-[#475569] font-medium">Apple</Text>
              </TouchableOpacity>
          </View>

            {/* Continue as Guest */}
            <TouchableOpacity className="mt-8">
                <Text className="text-[#2563EB] font-semibold text-lg">
                    Continue as a guest
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignInScreen;
