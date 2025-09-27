import { useAppDispatch, useAppSelector } from "@/redux";
import { handleToast } from "@/utils/toast";
import userApi from "@/services/userApi";
import { userActions } from "@/redux/slice/userSlice";
import { authActions } from "@/redux/slice/authSlice";

export default function useUser() {
  const dispatch = useAppDispatch();

  const getMe = async () => {
    try {
      const { status, data }: any = await userApi.getMe();
      if (status) {
        dispatch(userActions.getMeSuccess(data));
        dispatch(authActions.signInSuccess());
      }
    } catch (e: any) {
      handleToast(false, e.message);
    }
  };

  return {
    getMe,
  };
}
