import { toast } from "react-toastify";

export const handleToast = (
  isSuccess: boolean,
  message: string,
  duration?: number
) => {
  if(!message) return 
  const options = {
    autoClose: duration ?? 3000,
    className: isSuccess ? "bg-lime-500 text-white" : "bg-red-500 text-white",
  };

  if (isSuccess) {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};
