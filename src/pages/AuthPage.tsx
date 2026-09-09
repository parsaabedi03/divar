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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-bold text-center mb-6">
          {step === "send-otp" ? "ورود / ثبت‌نام" : "تایید شماره موبایل"}
        </h1>

        {step === "send-otp" && <SendOtp onSuccess={handleOtpSent} />}

        {step === "check-otp" && (
          <>
            <CheckOtp mobile={mobile} onSuccess={handleVerified} />
            <button
              onClick={handleBack}
              className="text-sm text-gray-500 mt-4 w-full text-center"
            >
              ویرایش شماره موبایل
            </button>
          </>
        )}
      </div>
    </div>
  );
};
