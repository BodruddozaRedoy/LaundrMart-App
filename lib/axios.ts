// lib/axios.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.10.13.80:8002",
  timeout: 15000,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

    /* ✅ Axios v1 safe header set */
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    /* 🔍 DEV LOGGING */
    if (__DEV__) {
      console.log("➡️ REQUEST");
      console.log("URL:", `${config.baseURL}${config.url}`);
      console.log("METHOD:", config.method?.toUpperCase());
      console.log("HEADERS:", config.headers);
      console.log("PAYLOAD:", config.data ?? "No Body");
    }

    return config;
  },
  (error) => {
    if (__DEV__) {
      console.log("❌ REQUEST ERROR:", error);
    }
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log("⬅️ RESPONSE");
      console.log("URL:", response.config.url);
      console.log("STATUS:", response.status);
      console.log("DATA:", response.data);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.log("❌ RESPONSE ERROR");
      console.log("URL:", error.config?.url);
      console.log("STATUS:", error.response?.status);
      // console.log("DATA:", error.response?.data);
    }
    return Promise.reject(error);
  }
);
