import PrimaryButton from '@/components/shared/PrimaryButton';
import { useToast } from '@/components/ui/toast/ToastContext';
import { images } from '@/constants';
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
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
  password?: string;
  confirmPassword?: string;
};

const ResetPassScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const { setPassword: setNewPassword, setPasswordState } = useUser();
  const { success, error } = useToast();

  /* -------------------- VALIDATION -------------------- */
  const validate = () => {
    const e: Errors = {};

    if (!password) e.password = 'Password is required';
    else if (password.length < 8)
      e.password = 'Password must be at least 8 characters';

    if (!confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword)
      e.confirmPassword = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------- HANDLER -------------------- */
  const handleConfirm = async () => {
    console.log(password)
    if (!validate()) return;

    try {
      const res = await setNewPassword({
        new_password: password,
      });

      success('Password Updated', res.message);
      router.replace('/(auth)/signIn');
    } catch (err: any) {
      error(
        'Failed to reset password',
        err?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 70}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              padding: 20,
              justifyContent: 'center',
              flexGrow: 1,
            }}
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

            {/* Headings */}
            <Text className="text-3xl font-bold text-[#1E293B] mt-5">
              Set Your Password
            </Text>
            <Text className="text-center text-[#64748B] mt-2 mb-10 px-5">
              Create a strong password to keep your account secure.
            </Text>

            {/* Inputs */}
            <View className="w-full gap-5">
              {/* Password */}
              <View>
                <Text className="mb-2 font-semibold text-[#64748B]">
                  Password
                </Text>
                <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                  <Ionicons name="lock-closed-outline" size={22} color="#94A3B8" />
                  <TextInput
                    value={password}
                    onChangeText={(v) => {
                      setPassword(v);
                      setErrors((e) => ({ ...e, password: undefined }));
                    }}
                    placeholder="Enter new password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    className="flex-1 py-4 px-2 text-black"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Confirm */}
              <View>
                <Text className="mb-2 font-semibold text-[#64748B]">
                  Confirm Password
                </Text>
                <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                  <Ionicons name="lock-closed-outline" size={22} color="#94A3B8" />
                  <TextInput
                    value={confirmPassword}
                    onChangeText={(v) => {
                      setConfirmPassword(v);
                      setErrors((e) => ({ ...e, confirmPassword: undefined }));
                    }}
                    placeholder="Confirm password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showConfirmPassword}
                    className="flex-1 py-4 px-2 text-black"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    <Ionicons
                      name={
                        showConfirmPassword
                          ? 'eye-outline'
                          : 'eye-off-outline'
                      }
                      size={22}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            </View>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={setPasswordState.isPending}
              className="w-full mt-10"
            >
              <PrimaryButton
                text={
                  setPasswordState.isPending
                    ? 'Updating...'
                    : 'Confirm'
                }
              />
            </TouchableOpacity>

            <View className="h-20" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassScreen;
