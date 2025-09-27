import { store } from "@/redux";
import { authActions } from "@/redux/slice/authSlice";
import { userActions } from "@/redux/slice/userSlice";
import { getToken } from "@/utils/token";
import axiosClient from "axios";
import axios from "axios";

const instance = axiosClient.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  withCredentials: false,
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config: any) {
    let accessToken = getToken();
    // Do something before request is sent

    config.headers.Authorization = "Bearer " + accessToken;

    if (!config.headers.Accept && config.headers["Content-Type"]) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response.data", error.response.data);
    if(error?.response?.status === 401) {
      store.dispatch(authActions.logout());
      store.dispatch(userActions.logout());
    }
    
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default instance;
