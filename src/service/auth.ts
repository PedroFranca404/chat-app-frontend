import { API_URL } from "@/lib/env";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const Login = async (request: LoginRequest) => {
  const login = await api.post("/auth/sign-in", request);
  return login;
};

export const Register = async (request: RegisterRequest) => {
  const register = await api.post("/auth/sign-up", request);
  return register;
};

export const isAuthenticated = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      return false;
    }

    const decodedAccessToken = jwtDecode(accessToken);
    const decodedRefreshToken = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;

    if (decodedAccessToken.exp! > currentTime) {
      return true;
    }

    if (decodedRefreshToken.exp! > currentTime) {
      const response = await api.post("/auth/refresh", { refreshToken });

      if (response.data?.accessToken && response.data?.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log("Error checking authentication:", error);
    return false;
  }
};
