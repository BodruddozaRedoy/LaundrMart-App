// lib/axios.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRedirection } from "../context/RedirectionContext"; // Import context

export const api = axios.create({
  baseURL: "http://10.10.13.80:8002",
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Trigger redirection using the context
      const { setTriggerRedirect } = useRedirection();
      setTriggerRedirect(true); // Set redirection flag to true
    }

    return Promise.reject(error);
  }
);
