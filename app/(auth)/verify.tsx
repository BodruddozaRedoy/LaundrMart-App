import HeaderBackButton from '@/components/common/HeaderBackButton';
import PrimaryButton from '@/components/shared/PrimaryButton';
import { useToast } from '@/components/ui/toast/ToastContext';
import { images } from '@/constants';
import { useUser } from '@/hooks/useUser';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTP_LENGTH = 4;

const VerifyScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState<number>(120);

  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  const { success, error } = useToast();
  const { verifyOtp, verifyOtpState, resendOtp, resendOtpState } = useUser();


  const params = useLocalSearchParams();
  const email =
    typeof params.email === 'string' ? params.email : undefined;

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* -------------------- AUTO FOCUS -------------------- */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* -------------------- OTP INPUT -------------------- */
  const handleChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${min}:${seconds}`;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    if (!email) {
      error('Invalid request', 'Email not found');
      return;
    }

    const otpValue = otp.join('');

    if (otpValue.length !== OTP_LENGTH) {
      error('Invalid OTP', 'Please enter the full OTP');
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        otp: otpValue,
      });

      success('Verified', res.message);
      if (params?.action === "forget_pass") {
        router.push("/(auth)/resetPassword")
      } else {
        router.replace('/(auth)/signIn');
      }
    } catch (err: any) {
      error(
        'Verification Failed',
        err?.response?.data?.message || 'Invalid OTP'
      );
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row pt-5 pl-5 justify-between items-center w-full">
          <HeaderBackButton onPress={() => router.back()} />
          <View />
        </View>

        <View className="items-center p-5 justify-center">
          {/* Logo */}
          <View className="mt-16 w-60 h-20">
            <Image source={images.Logo} className="w-full h-full" resizeMode="contain" />
          </View>

          {/* Headings */}
          <Text className="text-3xl font-bold text-[#1E293B] mt-5">
            Verify Your Account
          </Text>
          <Text className="text-[#64748B] mt-2 text-center">
            Enter the OTP sent to {'\n'}
            <Text className="font-semibold text-[#2563EB]">
              {email}
            </Text>
          </Text>

          {/* OTP Inputs */}
          <View className="flex-row justify-center mt-10 mb-6 gap-4">
            {otp.map((digit, index) => (
              <LinearGradient
                key={index}
                colors={['#E2E8F0', '#F8FAFC']}
                style={styles.gradientBox}
              >
                <View style={styles.innerShadowBox}>
                  <TextInput
                    ref={(el) => (inputRefs.current[index] = el)}
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
              onPress={async () => {
                if (!email) {
                  error("Invalid request", "Email not found");
                  return;
                }

                try {
                  await resendOtp({ email });
                  success("OTP Sent", "A new OTP has been sent");
                  setTimer(120);
                  setOtp(Array(OTP_LENGTH).fill(""));
                  inputRefs.current[0]?.focus();
                } catch (err: any) {
                  error(
                    "Resend Failed",
                    err?.response?.data?.message || "Please try again"
                  );
                }
              }}
              disabled={timer > 0 || resendOtpState.isPending}
            >
              <Text
                className={`font-semibold ${timer > 0 ? 'text-[#94A3B8]' : 'text-[#2563EB]'
                  }`}
              >
                {resendOtpState.isPending ? "Sending..." : "Re-send"}
              </Text>
            </TouchableOpacity>

          </View>

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={verifyOtpState.isPending}
            className="w-full"
          >
            <PrimaryButton
              text={verifyOtpState.isPending ? 'Verifying...' : 'Submit'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  gradientBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    padding: 1.5,
  },
  innerShadowBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
