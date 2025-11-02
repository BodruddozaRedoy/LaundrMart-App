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

const SignUpScreen = () => {
    // 👁️ Separate password visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ☑️ Remember Me (Terms & Conditions)
    const [agreeTerms, setAgreeTerms] = useState(false);

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: 'center', padding: 20 }}
            className="bg-white flex-grow"
        >
            {/* Logo */}
            <View className="mt-16 w-60 h-20">
                <Image
                    source={images.Logo}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            {/* Headings */}
            <Text className="text-3xl font-bold text-[#475569] mt-5">Welcome</Text>
            <Text className="text-[#64748B] mt-1 mb-10">Create an account</Text>

            {/* Inputs */}
            <View className="w-full gap-5 mt-5">
                {/* Email */}
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

                {/* Password */}
                <View>
                    <Text className="mb-2 font-semibold text-[#64748B]">Password</Text>
                    <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                        {/* Lock Icon */}
                        <Ionicons
                            name="lock-closed-outline"
                            size={22}
                            color="#94A3B8"
                            className="mr-2"
                        />

                        {/* Password Input */}
                        <TextInput
                            placeholder="Type here..."
                            secureTextEntry={!showPassword}
                            className="flex-1 py-4"
                        />

                        {/* Toggle Button */}
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
                        {/* Lock Icon */}
                        <Ionicons
                            name="lock-closed-outline"
                            size={22}
                            color="#94A3B8"
                            className="mr-2"
                        />

                        {/* Confirm Password Input */}
                        <TextInput
                            placeholder="Re-type your password..."
                            secureTextEntry={!showConfirmPassword}
                            className="flex-1 py-4"
                        />

                        {/* Toggle Button */}
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons
                                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={22}
                                color="#94A3B8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Terms & Conditions Checkbox */}
            <View className="flex-row items-start w-full mt-4">
                <TouchableOpacity
                    onPress={() => setAgreeTerms(!agreeTerms)}
                    className="flex-row items-start flex-shrink"
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
                        size={22}
                        color={agreeTerms ? '#2563EB' : '#94A3B8'}
                        style={{ marginTop: 2 }}
                    />
                    <Text className="ml-2 text-[#64748B] flex-shrink">
                        I agree to the <Text className="text-[#2563EB]">Terms & Conditions</Text> and{' '}
                        <Text className="text-[#2563EB]">Privacy Policy</Text>.
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
                disabled={!agreeTerms}
                onPress={() => router.push("/(auth)/verify")}
                className={`w-full p-4 rounded-lg mt-10 ${agreeTerms ? 'bg-[#2563EB]' : 'bg-[#94A3B8]'
                    }`}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Sign Up
                </Text>
            </TouchableOpacity>

            {/* Already have account */}
            <View className="flex-row mt-4">
                <Text className="text-[#475569]">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/signIn')}>
                    <Text className="text-[#2563EB] font-semibold">Sign In</Text>
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
                            uri: 'https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000',
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

export default SignUpScreen;
