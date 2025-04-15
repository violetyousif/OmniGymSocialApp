// This file contains the configuration for the frontend of the application.
// It includes the backend URL and the public Supabase client setup for authentication.

import { Platform } from "react-native";

/*
// Expo app running in iOS simulator? It can access localhost
const isLocalhostAvailable = Platform.OS === "ios" || Platform.OS === "android";

export const BACKEND_URL = isLocalhostAvailable
  ? process.env.EXPO_PUBLIC_BACKEND_URL || "http://your-local-ip:8000"
  : process.env.EXPO_PUBLIC_BACKEND_URL;
*/

export const BACKEND_URL =
  Platform.OS === "ios"
    ? "http://localhost:8000"
    : Platform.OS === "android"
    ? "http://10.0.2.2:8000"
    : process.env.EXPO_PUBLIC_BACKEND_URL;
