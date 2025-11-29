import HeaderBackButton from '@/components/common/HeaderBackButton';
import PrimaryButton from '@/components/shared/PrimaryButton';
import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const VerifyScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(120);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  // countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // handle OTP input
  const handleChange = (text: string, index: number): void => {
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const formatTime = (sec: number): string => {
    const min = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${min}:${seconds}`;
  };

  return (
    <ScrollView

      className="bg-white flex-grow "
    >
      {/* <StatusBar className="#fff" barStyle={"dark-content"} /> */}
      <View className='flex-row pt-5 pl-5 justify-between items-center w-full'>
        <HeaderBackButton onPress={() => router.back()} />
        <View />
      </View>
      <View className='items-center p-5 justify-center h-full'>
        {/* Logo */}
        <View className="mt-16 w-60 h-20">
          <Image
            source={images.Logo}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Headings */}
        <Text className="text-3xl font-bold text-[#1E293B] mt-5">
          Verify Your Account
        </Text>
        <Text className="text-[#64748B] mt-2 text-center">
          Enter the OTP sent to {'\n'}
          <Text className="font-semibold text-[#2563EB]">
            ( ahmadjubayerr@gmail.com )
          </Text>
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-center mt-10 mb-6 gap-4">
          {otp.map((digit, index) => (
            <LinearGradient
              key={index}
              colors={['#E2E8F0', '#F8FAFC']}
              start={{ x: 0.2, y: 0.2 }}
              end={{ x: 0.8, y: 0.8 }}
              style={styles.gradientBox}
            >
              <View style={styles.innerShadowBox}>
                <TextInput
                  ref={(el: any) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.otpInput}
                />
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Timer */}
        <Text className="text-[#475569] font-semibold text-base mb-4">
          {formatTime(timer)}
        </Text>

        {/* Resend */}
        <View className="flex-row items-center justify-center mb-10">
          <Text className="text-[#64748B] mr-1">Don’t receive code?</Text>
          <TouchableOpacity
            onPress={() => {
              setTimer(120);
              setOtp(['', '', '', '']);
              inputRefs.current[0]?.focus();
            }}
            disabled={timer > 0}
          >
            <Text
              className={`font-semibold ${timer > 0 ? 'text-[#94A3B8]' : 'text-[#2563EB]'
                }`}
            >
              Re-send
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={() => router.push('/')} className="w-full">
          <PrimaryButton text="Submit" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VerifyScreen;

// ---------- Styles ----------
const styles = StyleSheet.create({
  gradientBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    padding: 1.5, // thin gradient border
  },
  innerShadowBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    // "fake inner shadow" illusion
    shadowColor: '#000',
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  otpInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
});
