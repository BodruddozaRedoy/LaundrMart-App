import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

import {
  forgotPassword,
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  setNewPassword,
  verifyOtp,
} from "@/services/user.api";

import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  SetPasswordPayload,
  VerifyOtpPayload,
} from "@/types/user.types";

export const useUser = () => {
  /* REGISTER */
  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });

  /* LOGIN */
  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log(data);
      if (data?.tokens) {
        await AsyncStorage.setItem("accessToken", data.tokens.access);
        console.log("token saved");
      }
    },
  });

  /* FORGOT PASSWORD */
  const forgotPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPassword,
  });

  /* RESET PASSWORD */
  const resetPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ResetPasswordPayload
  >({
    mutationFn: resetPassword,
  });

  /* VERIFY OTP */
  const verifyOtpMutation = useMutation<AuthResponse, Error, VerifyOtpPayload>({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      if (data?.tokens) {
        await AsyncStorage.setItem("accessToken", data.tokens.access);
      }
    },
  });

  /* RESEND OTP */
  const resendOtpMutation = useMutation<AuthResponse, Error, ResendOtpPayload>({
    mutationFn: resendOtp,
  });

  /* -------- SET PASSWORD -------- */
  const setPasswordMutation = useMutation<
    AuthResponse,
    Error,
    SetPasswordPayload
  >({
    mutationFn: setNewPassword,
  });

  /* LOGOUT */
  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
  };

  return {
    /* actions */
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resendOtp: resendOtpMutation.mutateAsync,
    setPassword: setPasswordMutation.mutateAsync,
    logout,

    /* states */
    registerState: registerMutation,
    loginState: loginMutation,
    forgotPasswordState: forgotPasswordMutation,
    resetPasswordState: resetPasswordMutation,
    verifyOtpState: verifyOtpMutation,
    resendOtpState: resendOtpMutation,
    setPasswordState: setPasswordMutation,
  };
};
