import { createSlice } from "@reduxjs/toolkit";

export interface ChatsStateTypes {
  chats: any[];
}

const initialState: ChatsStateTypes = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state: ChatsStateTypes, action) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
