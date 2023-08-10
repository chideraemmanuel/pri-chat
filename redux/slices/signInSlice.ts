import { createSlice } from "@reduxjs/toolkit";

export interface SignInStateTypes {
  signUp: {
    firstName: {
      value: string;
      error: string | null;
    };
    lastName: {
      value: string;
      error: string | null;
    };
    email: {
      value: string;
      error: string | null;
    };
    password: {
      value: string;
      error: string | null;
    };
  };
  login: {
    email: {
      value: string;
      error: string | null;
    };
    password: {
      value: string;
      error: string | null;
    };
  };
}

const initialState: SignInStateTypes = {
  signUp: {
    firstName: {
      value: "",
      error: null,
    },
    lastName: {
      value: "",
      error: null,
    },
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
  },
  login: {
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
  },
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignUpFirstName: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.firstName.value = action.payload;
    },
    setSignUpLastName: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.lastName.value = action.payload;
    },
    setSignUpEmail: (state: SignInStateTypes, action: { payload: string }) => {
      state.signUp.email.value = action.payload;
    },
    setSignUpPassword: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.password.value = action.payload;
    },
    setLoginEmail: (state: SignInStateTypes, action: { payload: string }) => {
      state.login.email.value = action.payload;
    },
    setLoginPassword: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.login.password.value = action.payload;
    },
    // ERRORS
    setSignUpFirstNameError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.firstName.error = action.payload;
    },
    setSignUpLastNameError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.lastName.error = action.payload;
    },
    setSignUpEmailError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.email.error = action.payload;
    },
    setSignUpPasswordError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.signUp.password.error = action.payload;
    },
    setLoginEmailError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.login.email.error = action.payload;
    },
    setLoginPasswordError: (
      state: SignInStateTypes,
      action: { payload: string }
    ) => {
      state.login.password.error = action.payload;
    },
    clearSignUpFirstNameError: (state: SignInStateTypes) => {
      state.signUp.firstName.error = null;
    },
    clearSignUpLastNameError: (state: SignInStateTypes) => {
      state.signUp.lastName.error = null;
    },
    clearSignUpEmailError: (state: SignInStateTypes) => {
      state.signUp.email.error = null;
    },
    clearSignUpPasswordError: (state: SignInStateTypes) => {
      state.signUp.password.error = null;
    },
    clearLoginEmailError: (state: SignInStateTypes) => {
      state.login.email.error = null;
    },
    clearLoginPasswordError: (state: SignInStateTypes) => {
      state.login.password.error = null;
    },
    resetSignInForm: (state: SignInStateTypes) => {
      state.signUp.firstName = { value: "", error: null };
      state.signUp.lastName = { value: "", error: null };
      state.signUp.email = { value: "", error: null };
      state.signUp.password = { value: "", error: null };
    },
    resetLoginForm: (state: SignInStateTypes) => {
      state.login.email = { value: "", error: null };
      state.login.password = { value: "", error: null };
    },
    resetAllForms: (state: SignInStateTypes) => {
      state.signUp.firstName = { value: "", error: null };
      state.signUp.lastName = { value: "", error: null };
      state.signUp.email = { value: "", error: null };
      state.signUp.password = { value: "", error: null };

      state.login.email = { value: "", error: null };
      state.login.password = { value: "", error: null };
    },
    resetErrors: (state: SignInStateTypes) => {
      state.signUp.firstName.error = null;
      state.signUp.lastName.error = null;
      state.signUp.email.error = null;
      state.signUp.password.error = null;

      state.login.email.error = null;
      state.login.password.error = null;
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
  setSignUpFirstNameError,
  setSignUpLastNameError,
  setSignUpEmailError,
  setSignUpPasswordError,
  setLoginEmailError,
  setLoginPasswordError,
  clearSignUpFirstNameError,
  clearSignUpLastNameError,
  clearSignUpEmailError,
  clearSignUpPasswordError,
  clearLoginEmailError,
  clearLoginPasswordError,
  resetSignInForm,
  resetLoginForm,
  resetAllForms,
  resetErrors,
} = signInSlice.actions;

export default signInSlice.reducer;
