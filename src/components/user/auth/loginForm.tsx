import { useEffect } from "react";
import { RectangleEllipsis, LogIn, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import FormInput from "@/components/shared/input/formInput";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux";
import SubmitButton from "@/components/shared/button/SubmitButton";

const LoginForm = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { loginForm, onLoginSubmit } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  return (
    <>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className="space-y-2"
      >
        <FormInput
          label="Username"
          name="username"
          form={loginForm}
          icon={User}
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          form={loginForm}
          icon={RectangleEllipsis}
        />
        <SubmitButton
          isLoading={isLoading}
          title={"Đăng nhập"}
          loadingButtonTitle={"Đang đăng nhập..."}
          className="w-full bg-slate-900 hover:bg-slate-800"
          icon={LogIn}
        />

        <p className="text-sm font-light text-gray-500 ">
          Bạn chưa có tài khoản?{" "}
          <span
            // href="/register"
            onClick={() => navigate("/register")}
            className="font-medium text-purple-600 hover:underline cursor-pointer"
          >
            Đăng ký
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
