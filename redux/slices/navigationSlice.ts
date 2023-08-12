import { createSlice } from "@reduxjs/toolkit";

export interface NavigationStateTypes {
  searchBarActive: boolean;
  searchKeyword: string;
  navigationMenuOpen: boolean;
}

const initialState: NavigationStateTypes = {
  searchBarActive: false,
  searchKeyword: "",
  navigationMenuOpen: false,
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
    toggleNavigationMenu: (state: NavigationStateTypes) => {
      if (state.navigationMenuOpen) {
        state.navigationMenuOpen = false;
      } else {
        state.navigationMenuOpen = true;
      }
    },
  },
});

export const {
  openSearchBar,
  closeSearchBar,
  setSearchKeyword,
  clearSearchKeyword,
  toggleNavigationMenu,
} = navigationSlice.actions;

export default navigationSlice.reducer;
