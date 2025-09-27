import { InferType } from "yup";
import * as yup from "yup";

export const TodoForm = yup.object().shape({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup.string().optional(),
  status: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export type TodoFormType = InferType<typeof TodoForm>;
