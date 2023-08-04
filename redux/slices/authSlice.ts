import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateTypes {
  currentUser: {
    isLoading: boolean;
    active: boolean;
  };
}

const initialState: AuthStateTypes = {
  currentUser: {
    isLoading: true,
    active: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (
      state: AuthStateTypes,
      action: { payload: { isLoading: boolean; active: boolean } }
    ) => {
      state.currentUser.isLoading = action.payload.isLoading;
      state.currentUser.active = action.payload.active;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
