import { useState } from "react";
import { useNavigate } from "react-router";

import { SendOtp, CheckOtp } from "@/features/auth";
import { ROUTES } from "@/config/routes";

type AuthStep = "send-otp" | "check-otp";

export const AuthPage = () => {
  const [step, setStep] = useState<AuthStep>("send-otp");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleOtpSent = (phone: string) => {
    setMobile(phone);
    setStep("check-otp");
  };

  const handleVerified = () => {
    navigate(ROUTES.HOME);
  };

  const handleBack = () => {
    setStep("send-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-sm shadow-sm p-6">
        <h1 className="text-lg text-neutral-dark-1 border-b border-b-emerald-100 pb-5 font-normal mb-8">
          ورود به حساب کاربری
        </h1>
        {step === "send-otp" && (
          <SendOtp onSuccess={handleOtpSent} mobile={mobile} />
        )}

        {step === "check-otp" && (
          <CheckOtp
            mobile={mobile}
            onSuccess={handleVerified}
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};
