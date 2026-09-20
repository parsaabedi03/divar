import { LoaderCircle } from "lucide-react";

export const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin text-primary" size={25} />
    </div>
  );
};
