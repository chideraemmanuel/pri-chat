import { configureStore } from "@reduxjs/toolkit";
import signInReducer, { SignInStateTypes } from "@/redux/slices/signInSlice";
import authReducer, { AuthStateTypes } from "@/redux/slices/authSlice";
import chatReducer, { ChatsStateTypes } from "@/redux/slices/chatsSlice";
import navigationReducer, {
  NavigationStateTypes,
} from "./slices/navigationSlice";

export interface StoreTypes {
  signIn: SignInStateTypes;
  auth: AuthStateTypes;
  chat: ChatsStateTypes;
  navigation: NavigationStateTypes;
}

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    auth: authReducer,
    chat: chatReducer,
    navigation: navigationReducer,
  },
});
