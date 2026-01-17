import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  forgotPassword,
  getCustomerProfile,
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  setNewPassword,
  updateCustomerProfileForm,
  verifyOtp,
} from "@/services/user.api";

import {
  AuthResponse,
  CustomerProfile,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  SetPasswordPayload,
  VerifyOtpPayload,
} from "@/types/user.types";

import { clearProfile, storeProfile } from "@/lib/profileStorage";

export const useUser = () => {
  const queryClient = useQueryClient();

  /* ---------------- REGISTER ---------------- */
  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });

  /* ---------------- LOGIN ---------------- */
  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data?.tokens?.access) {
        await AsyncStorage.setItem("accessToken", data.tokens.access);

        const profile = await getCustomerProfile();
        await storeProfile(profile);

        queryClient.setQueryData(["customer-profile"], profile);
      }
    },
  });

  /* ---------------- CUSTOMER PROFILE ---------------- */
  const customerProfileQuery = useQuery<CustomerProfile | null>({
    queryKey: ["customer-profile"],
    queryFn: async () => {
      const profile = await getCustomerProfile();
      await storeProfile(profile);
      return profile;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  /* ---------------- UPDATE CUSTOMER PROFILE ---------------- */
  const updateProfileMutation = useMutation<CustomerProfile, Error, FormData>({
    mutationFn: updateCustomerProfileForm,
    onSuccess: async (updatedProfile) => {
      await storeProfile(updatedProfile);
      queryClient.setQueryData(["customer-profile"], updatedProfile);
    },
  });

  /* ---------------- FORGOT PASSWORD ---------------- */
  const forgotPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPassword,
  });

  /* ---------------- RESET PASSWORD ---------------- */
  const resetPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ResetPasswordPayload
  >({
    mutationFn: resetPassword,
  });

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtpMutation = useMutation<AuthResponse, Error, VerifyOtpPayload>({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      if (data?.tokens?.access) {
        await AsyncStorage.setItem("accessToken", data.tokens.access);

        const profile = await getCustomerProfile();
        await storeProfile(profile);

        queryClient.setQueryData(["customer-profile"], profile);
      }
    },
  });

  /* ---------------- RESEND OTP ---------------- */
  const resendOtpMutation = useMutation<AuthResponse, Error, ResendOtpPayload>({
    mutationFn: resendOtp,
  });

  /* ---------------- SET PASSWORD ---------------- */
  const setPasswordMutation = useMutation<
    AuthResponse,
    Error,
    SetPasswordPayload
  >({
    mutationFn: setNewPassword,
  });

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await clearProfile();

    queryClient.removeQueries({
      queryKey: ["customer-profile"],
    });
  };

  return {
    /* queries */
    customerProfile: customerProfileQuery.data,
    customerProfileState: customerProfileQuery,

    // ✅ ADD THESE (for pull-to-refresh)
    refetchProfile: customerProfileQuery.refetch,
    isProfileFetching: customerProfileQuery.isFetching,

    /* actions */
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resendOtp: resendOtpMutation.mutateAsync,
    setPassword: setPasswordMutation.mutateAsync,
    logout,
    updateProfile: updateProfileMutation.mutateAsync,

    /* states */
    registerState: registerMutation,
    loginState: loginMutation,
    forgotPasswordState: forgotPasswordMutation,
    resetPasswordState: resetPasswordMutation,
    verifyOtpState: verifyOtpMutation,
    resendOtpState: resendOtpMutation,
    setPasswordState: setPasswordMutation,
    updateProfileState: updateProfileMutation,
  };
};
