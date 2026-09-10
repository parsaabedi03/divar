import { useMutation } from "@tanstack/react-query";

import { checkOtpRequest } from "../api/auth.api";
import { authKeys } from "../api/auth.keys";
import { setCookie } from "@/shared/utils/cookieHelpers";

export const useCheckOtp = () => {
  return useMutation({
    mutationKey: authKeys.checkOtp(),
    mutationFn: checkOtpRequest,
    onSuccess: (data) => {
      setCookie({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
  });
};
