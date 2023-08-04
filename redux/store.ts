import { configureStore } from "@reduxjs/toolkit";
import signInReducer, { SignInStateTypes } from "@/redux/slices/signInSlice";
import authReducer, { AuthStateTypes } from "@/redux/slices/authSlice";

export interface StoreTypes {
  signIn: SignInStateTypes;
  auth: AuthStateTypes;
}

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    auth: authReducer,
  },
});
