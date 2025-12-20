import { api } from "@/lib/axios";
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

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post("/accounts/api/register", payload);
  return data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const { data } = await api.post("/accounts/api/login", payload);
  return data;
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<AuthResponse> => {
  const { data } = await api.post("/accounts/api/forget-password", payload);
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const { data } = await api.patch("/accounts/api/verify-otp", payload);
  return data;
};

export const resendOtp = async (
  payload: ResendOtpPayload
): Promise<AuthResponse> => {
  const { data } = await api.post("/accounts/api/resend-otp", payload);
  return data;
};

export const setNewPassword = async (
  payload: SetPasswordPayload
): Promise<AuthResponse> => {
  const { data } = await api.patch("/accounts/api/change-password", payload);
  //   console.log(data);
  return data;
};