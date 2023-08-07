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

const Chats: React.FC = () => {
  // const { chats } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  const data = useGetChats();
  console.log(data);

  const chats: any[] | [] = [
    // {
    //   senderUid: "",
    //   latestMessage: {
    //   sentAt: "",
    //     text: "Hey there!",
    //     image: null,
    //   },
    // },
  ];

  return (
    <div className={styles.chats}>
      {data && data.length > 0 && data.map((chat) => <Chat {...chat} />)}

      {data.length === 0 && (
        <p>
          You don't have any recent chats. Search for users to start a
          conversation.
        </p>
      )}
    </div>
  );
};

export default Chats;
