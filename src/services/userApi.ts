import axios from "@/config/axios.ts";
import { IResponse } from "../types/common";

const getMe = async () => {
  return await axios.get<IResponse<any>>("/users/me");
};

const userApi = {
  getMe,
};

export default userApi;
