import { API_URL, JWT_KEY } from "@/lib/env";
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
}

export const Register = async (request: RegisterRequest) => {
  const register = await api.post("/auth/sign-up", request);
  return register;
}