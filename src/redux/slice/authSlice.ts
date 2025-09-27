import { handleToast } from "@/utils/toast";
import { createSlice } from "@reduxjs/toolkit";


interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
    handleError(state, action) {
      const error = action.payload;
      state.isLoading = false;
      handleToast(false, error);
    },

    signIn(state) {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    signInSuccess(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    register(state) {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    registerSuccess(state) {
      state.isLoading = false;
    },

    updateAuthSuccess(state) {
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
