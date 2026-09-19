import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import {
  createPostFormSchema,
  STEP_FIELDS,
  type CreatePostFormInput,
  type CreatePostFormValues,
} from "../../schemas/posts.schema";

import { useCreatePost } from "../../hooks/usePost";
import { ROUTES } from "@/config/routes";

import { MobileHeader } from "@/shared/components/ui/MobileHeader";
import { StepImages } from "./StepImages";
import { StepDetails } from "./StepDetails";
import { StepReview } from "./StepReview";
import { StepIndicator } from "./StepIndicator";

const TOTAL_STEPS = 3;

export const CreatePost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const methods = useForm<CreatePostFormInput, unknown, CreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onTouched",
  });

  const { handleSubmit, trigger } = methods;
  const { mutate, isPending } = useCreatePost();

  const goNext = async () => {
    const fields = STEP_FIELDS[step as 1 | 2];
    const isValid = await trigger(fields);
    if (isValid) setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (values: CreatePostFormValues) => {
    mutate(values);
    navigate(ROUTES.DASHBOARD_MY_POSTS);
  };

  return (
    <>
      {window.innerWidth < 900 && (
        <MobileHeader text="آگهی جدید" needArrow={true} />
      )}
      <FormProvider {...methods}>
        <div className="max-w-2xl p-3 mx-auto">
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {step === 1 && <StepImages onNext={goNext} />}
            {step === 2 && <StepDetails onNext={goNext} onBack={goBack} />}
            {step === 3 && <StepReview onBack={goBack} isPending={isPending} />}
          </form>
        </div>
      </FormProvider>
    </>
  );
};
