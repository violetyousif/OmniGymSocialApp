import { Platform } from "react-native";

export const BACKEND_URL =
  Platform.OS === "ios"
    ? "http://localhost:8000"
    : Platform.OS === "android"
    ? "http://10.0.2.2:8000"
    : process.env.EXPO_PUBLIC_BACKEND_URL;
