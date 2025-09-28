import FormInput from "@/components/shared/input/formInput";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { LogIn, Mail, PersonStanding, RectangleEllipsis } from "lucide-react";
import SubmitButton from "@/components/shared/button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux";

const RegisterForm = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { registerForm, onRegisterSubmit } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  return (
    <div>
      <form
        onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
        className="space-y-2"
      >
        <FormInput
          label="Username"
          name="username"
          form={registerForm}
          icon={PersonStanding}
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          form={registerForm}
          icon={RectangleEllipsis}
        />
        <FormInput
          type="password"
          label="Confirm password"
          name="confirmPassword"
          form={registerForm}
          icon={RectangleEllipsis}
        />
        <SubmitButton
          isLoading={isLoading}
          title={"Sign Up"}
          loadingButtonTitle={"Creating please wait..."}
          className="w-full bg-slate-900 hover:bg-slate-800"
          icon={LogIn}
        />

        <p className="text-sm font-light text-gray-500">
          Bạn đã có tài khoản?{" "}
          <span
            // href="/register"
            onClick={() => navigate("/login")}
            className="font-medium text-purple-600 hover:underline cursor-pointer"
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
