// types/user.types.ts
export type UserRole = "Customer";
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin" | "scholar";
  avatar?: string;
  verified?: boolean;
}

export interface RegisterPayload {
  email?: string;
  phone_number?: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  tokens?: { access: string; refresh: string };
}

export interface LoginPayload {
  email_or_phone: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email?: string;
  phone_number?: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface VerifyOtpPayload {
  email?: string;
  phone_number?: string;
  otp: string;
}
export interface ResendOtpPayload {
  email?: string;
  phone_number?: string;
}

export interface SetPasswordPayload {
  new_password: string;
}

export interface CustomerProfile {
  id: string;
  name?: string;
  full_name: string;
  email?: string;
  image: string;
  phone_number?: string;
  is_verified: boolean;
  role: "Customer";
  location?: string;
  lat: string;
  lng: string;
}

export interface UpdateCustomerProfilePayload {
  full_name?: string;
  email?: string;
  phone_number?: string;
  image?: string;
  location?: string;
  lat?: string;
  lng?: string;
}

