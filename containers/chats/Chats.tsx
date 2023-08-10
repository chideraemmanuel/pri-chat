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
import { FaUserPlus } from "react-icons/fa";
import FormInput from "@/components/formInput/FormInput";
import { signOut } from "firebase/auth";

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

  // signOut(auth);

  return (
    <div className={styles.chats}>
      {data && data.length > 0 && data.map((chat) => <Chat {...chat} />)}

      {data.length === 0 && (
        <p>
          You don't have any recent chats. Click on{" "}
          <span>
            <FaUserPlus />
          </span>{" "}
          to find users and start a conversation.
        </p>
      )}

      {/* <FormInput
        type="text"
        placeholder="test"
        value={data}
        setValue={data}
        error
      /> */}
    </div>
  );
};

export default Chats;
