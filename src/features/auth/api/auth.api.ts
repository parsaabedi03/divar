import axiosInstance from "@/lib/axios";

import type {
  SendOtpFormValues,
  CheckOtpFormValues,
} from "../schemas/auth.schema";

interface SendOtpResponse {
  message: string;
}
interface CheckOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const sendOtpRequest = async (
  payload: SendOtpFormValues,
): Promise<SendOtpResponse> => {
  const { data } = await axiosInstance.post("/auth/send-otp", payload);
  return data;
};

export const checkOtpRequest = async (
  payload: CheckOtpFormValues,
): Promise<CheckOtpResponse> => {
  const { data } = await axiosInstance.post("/auth/check-otp", payload);
  return data;
};
