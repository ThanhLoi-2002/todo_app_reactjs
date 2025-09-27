import { useEffect, useState } from "react";
import { RectangleEllipsis, LogIn, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import FormInput from "@/components/shared/input/formInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux";
import { authActions } from "@/redux/slice/authSlice";
import { userActions } from "@/redux/slice/userSlice";
import authApi from "@/services/authApi";
import { handleToast } from "@/utils/toast";
import { setToken } from "@/utils/token";
import { LoginFormType } from "@/validations/auth.schema";
import SubmitButton from "@/components/shared/button/SubmitButton";
import useUser from "@/hooks/useUser";

const LoginForm = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { loginForm } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getMe } = useUser();

  async function onLoginSubmit(values: LoginFormType) {
    dispatch(authActions.signIn());
    try {
      const { status, message, data }: any = await authApi.signIn(values);

      if (status) {
        setToken(data.accessToken);
        handleToast(true, message);
        dispatch(authActions.signInSuccess());
        getMe();
        // navigate("/");
      }
    } catch (e: any) {
      dispatch(authActions.handleError(e.message));
    }
  }

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
          className="w-full"
          icon={LogIn}
        />

        <p className="text-sm font-light text-gray-500 ">
          Bạn chưa có tài khoản?{" "}
          <a
            href="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Đăng ký
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
