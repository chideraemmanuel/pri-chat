import { createSlice } from "@reduxjs/toolkit";

export interface SignInStateTypes {
  signUp: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
}

const initialState: SignInStateTypes = {
  signUp: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  login: {
    email: "",
    password: "",
  },
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignUpFirstName: (state: SignInStateTypes, action) => {
      state.signUp.firstName = action.payload;
    },
    setSignUpLastName: (state: SignInStateTypes, action) => {
      state.signUp.lastName = action.payload;
    },
    setSignUpEmail: (state: SignInStateTypes, action) => {
      state.signUp.email = action.payload;
    },
    setSignUpPassword: (state: SignInStateTypes, action) => {
      state.signUp.password = action.payload;
    },
    setLoginEmail: (state: SignInStateTypes, action) => {
      state.login.email = action.payload;
    },
    setLoginPassword: (state: SignInStateTypes, action) => {
      state.login.password = action.payload;
    },
  },
});

export const {
  setSignUpFirstName,
  setSignUpLastName,
  setSignUpEmail,
  setSignUpPassword,
  setLoginEmail,
  setLoginPassword,
} = signInSlice.actions;

export default signInSlice.reducer;
