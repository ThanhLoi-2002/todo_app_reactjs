import { Loader } from "lucide-react";
import { FC } from "react";

interface Props {
  isLoading?: boolean;
  title: string;
  loadingButtonTitle?: string;
  className?: string;
  icon?: any;
  onClick?: () => void;
}
const SubmitButton: FC<Props> = ({
  isLoading = false,
  title,
  loadingButtonTitle = "Loading please wait...",
  className,
  icon,
  onClick,
}) => {
  const Icon = icon;
  return (
    <div className="sm:col-span-1">
      {isLoading ? (
        <button
          disabled
          type="button"
          className={`${className} flex justify-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-slate-800`}
        >
          <Loader className="animate-spin w-5 h-5 mr-2" />
          {loadingButtonTitle}
        </button>
      ) : (
        <button
          type="submit"
          onClick={onClick}
          className={`${className} flex justify-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-slate-800`}
        >
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          <span>{title}</span>
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
