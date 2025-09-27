import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { removeToken } from "../../utils/token";
import { handleToast } from "@/utils/toast";
import { UserType } from "@/types/entities";

interface IState {
  isLoading: boolean;
  user?: UserType;
}

const initialState: IState = {
  isLoading: false,
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      removeToken();
      state.user = undefined;
    },
    handleError(state, action) {
      const error = action.payload;
      state.isLoading = false;
      handleToast(false, error);
    },

    getMe(state) {
      state.isLoading = true;
      console.log("getMe reducer called");
    },
    getMeSuccess(state, action: PayloadAction<UserType>) {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
