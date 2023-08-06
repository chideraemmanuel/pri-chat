import { createSlice } from "@reduxjs/toolkit";

export interface NavigationStateTypes {
  searchBarActive: boolean;
  searchKeyword: string;
}

const initialState: NavigationStateTypes = {
  searchBarActive: false,
  searchKeyword: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openSearchBar: (state: NavigationStateTypes) => {
      state.searchBarActive = true;
    },
    closeSearchBar: (state: NavigationStateTypes) => {
      state.searchBarActive = false;
    },
    setSearchKeyword: (state: NavigationStateTypes, action) => {
      state.searchKeyword = action.payload;
    },
    clearSearchKeyword: (state: NavigationStateTypes) => {
      state.searchKeyword = "";
    },
  },
});

export const {
  openSearchBar,
  closeSearchBar,
  setSearchKeyword,
  clearSearchKeyword,
} = navigationSlice.actions;

export default navigationSlice.reducer;
