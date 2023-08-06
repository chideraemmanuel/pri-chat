import { createSlice } from "@reduxjs/toolkit";

export interface ChatsStateTypes {
  chats: any[];
  activeChat: {
    senderUid: string;
    senderFirstName: string;
    senderLastName: string;
    senderProfileImage: string;
  } | null;
  message: string;
}

const initialState: ChatsStateTypes = {
  chats: [],
  activeChat: null,
  message: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state: ChatsStateTypes, action) => {
      state.chats.push(action.payload);
    },
    setActiveChat: (
      state: ChatsStateTypes,
      action: {
        payload: {
          senderUid: string;
          senderFirstName: string;
          senderLastName: string;
          senderProfileImage: string;
        };
      }
    ) => {
      state.activeChat = action.payload;
    },
    closeActiveChat: (state: ChatsStateTypes) => {
      state.activeChat = null;
    },
    setMessage: (state: ChatsStateTypes, action) => {
      state.message = action.payload;
    },
  },
});

export const { setChats, setActiveChat, closeActiveChat, setMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
