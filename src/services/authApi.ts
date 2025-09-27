import { LoginFormType, RegisterFormType } from "@/validations/auth.schema";
import { IResponse } from "../types/common";
import axios from "@/config/axios.ts";

const register = async (data: RegisterFormType) => {
  return axios.post(`/auth/register`, data);
};

const signIn = async (data: LoginFormType) => {
  return axios.post<IResponse<any>>("/auth/login", data);
};

const authApi = {
  register,
  signIn,
};

export default authApi;
