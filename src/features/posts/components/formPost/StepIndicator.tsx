interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["تصاویر و توضیحات", "جزئیات و مکان", "بررسی نهایی"];

export const StepIndicator = ({
  currentStep,
  totalSteps,
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between gap-5">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center flex-col flex-1">
          <span
            className={`block text-sm font-normal mb-2 ${step === currentStep ? "text-primary" : "text-neutral"}`}
          >
            {STEP_LABELS[step - 1]}
          </span>
          <div
            className={`flex w-full items-center justify-center  h-1 rounded-sm ${
              step === currentStep
                ? "bg-primary"
                : step < currentStep
                  ? "bg-primary-light"
                  : "bg-neutral-light"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};
