"use client";

import Chat from "@/components/chat/Chat";
import styles from "./Chats.module.scss";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/redux/slices/chatsSlice";
import { StoreTypes } from "@/redux/store";
import { useGetChats } from "@/hooks/useGetChats";

interface Props {
  uid: string;
}

const Chats: React.FC<Props> = ({ uid }) => {
  // const { chats } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  const data = useGetChats();

  const chats = [
    {
      senderUid: "",
      createdAt: "",
      latestMessage: {
        text: "Hey there!",
        image: null,
      },
    },
  ];

  return (
    <div className={styles.chats}>
      {/* {data.map((chat) => (
        <Chat />
      ))} */}
      {chats.map((chat) => (
        <Chat {...chat} />
      ))}
      {/* <Chat /> */}
    </div>
  );
};

export default Chats;
