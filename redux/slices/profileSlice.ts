import { createSlice } from "@reduxjs/toolkit";

export interface ProfileStateTypes {
  firstName: string;
  lastName: string;
  profileImage: string | null | File;
}

const initialState: ProfileStateTypes = {
  firstName: "",
  lastName: "",
  profileImage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileFirstName: (
      state: ProfileStateTypes,
      action: { payload: string }
    ) => {
      state.firstName = action.payload;
    },
    setProfileLastName: (
      state: ProfileStateTypes,
      action: { payload: string }
    ) => {
      state.lastName = action.payload;
    },
    setProfileImageSrc: (
      state: ProfileStateTypes,
      action: { payload: string | null | File }
    ) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setProfileFirstName, setProfileLastName, setProfileImageSrc } =
  profileSlice.actions;

export default profileSlice.reducer;
