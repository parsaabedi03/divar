import { useMutation } from "@tanstack/react-query";

import { sendOtpRequest } from "../api/auth.api";
import { authKeys } from "../api/auth.keys";

export const useSendOtp = () => {
  return useMutation({
    mutationKey: authKeys.sendOtp(),
    mutationFn: sendOtpRequest,
    onError: (error) => {
      console.error("خطا در ارسال کد تایید:", error);
    },
  });
};
