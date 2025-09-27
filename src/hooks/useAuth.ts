import {
  LoginFormType,
  RegisterFormType,
  RegisterForm,
  LoginForm,
} from "@/validations/auth.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux";
import { authActions } from "@/redux/slice/authSlice";
import authApi from "@/services/authApi";
import { handleToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { userActions } from "@/redux/slice/userSlice";

const registerDefaultValues: RegisterFormType = {
  username: "",
  password: "",
  confirmPassword: "",
};

const loginDefaultValues: LoginFormType = {
  username: "",
  password: "",
};

export default function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const registerForm = useForm<RegisterFormType>({
    resolver: yupResolver(RegisterForm),
    defaultValues: registerDefaultValues,
  });

  const loginForm = useForm<LoginFormType>({
    resolver: yupResolver(LoginForm),
    defaultValues: loginDefaultValues,
  });

  async function onRegisterSubmit(values: RegisterFormType) {
    dispatch(authActions.register());
    try {
      const { status, message, data }: any = await authApi.register(values);

      if (status) {
        handleToast(status, message);
        dispatch(authActions.registerSuccess());
        navigate('/login')
      }
    } catch (e: any) {
      dispatch(authActions.handleError(e.message));
    }
  }

  const logout = () => {
    dispatch(authActions.logout());
    dispatch(userActions.logout());
  }

  return {
    onRegisterSubmit,
    registerForm,
    loginForm,
    logout,
  };
}
