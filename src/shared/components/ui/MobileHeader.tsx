import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface MobileHeaderProps {
  text: string;
  needArrow?: boolean;
}

export const MobileHeader = ({
  text,
  needArrow = false,
}: MobileHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="absolute flex top-0 right-0 left-0 h-16 px-4 border-b border-emerald-200 bg-white gap-5">
      {needArrow && (
        <button
          onClick={() => navigate(-1)}
          className="text-neutral self-center focus:bg-emerald-200 focus:text-neutral-dark-1 h-fit p-2 rounded-full "
        >
          <ArrowRight size={20} />
        </button>
      )}
      <p className="self-center text-neutral-dark-1 font-medium">{text}</p>
    </div>
  );
};
