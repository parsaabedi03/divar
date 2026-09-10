export const authKeys = {
  all: ["auth"] as const,
  sendOtp: () => [...authKeys.all, "send-otp"] as const,
  checkOtp: () => [...authKeys.all, "check-otp"] as const,
};
