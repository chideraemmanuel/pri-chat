import { configureStore } from "@reduxjs/toolkit";
import signInReducer, { SignInStateTypes } from "@/redux/slices/signInSlice";
import authReducer, { AuthStateTypes } from "@/redux/slices/authSlice";
import chatReducer, { ChatsStateTypes } from "@/redux/slices/chatsSlice";

export interface StoreTypes {
  signIn: SignInStateTypes;
  auth: AuthStateTypes;
  chat: ChatsStateTypes;
}

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});
