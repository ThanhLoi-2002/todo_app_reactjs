import * as yup from "yup";
import { InferType } from "yup";

export const RegisterForm = yup.object().shape({
  username: yup.string().required("Tên người dùng là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

export type RegisterFormType = InferType<typeof RegisterForm>;

export const LoginForm = yup.object({
  username: yup.string().required("Tên người dùng là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormType = InferType<typeof LoginForm>;
