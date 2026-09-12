import axios, { type AxiosInstance } from "axios";

import { env } from "@/config/env";

const BASE_URL = env.apiUrl;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default axiosInstance;
