"use client";

import Message from "@/components/message/Message";
import styles from "./ConversationBox.module.scss";
import {
  FiArrowLeft,
  FiChevronsRight,
  FiClipboard,
  FiImage,
  FiSend,
  FiX,
} from "react-icons/fi";
import { FaClipboard } from "react-icons/fa";
import Image from "next/image";
import defaultProfileImage from "@/assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { closeActiveChat, setMessage } from "@/redux/slices/chatsSlice";
import { StoreTypes } from "@/redux/store";
import { useSendMessage } from "@/hooks/useSendMessage";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "@/config/firebase";
import { useGetConversation } from "@/hooks/useGetConversation";

const ConversationBox: React.FC = () => {
  const { activeChat, message } = useSelector(
    (store: StoreTypes) => store.chat
  );

  const dispatch = useDispatch();

  const conversation = useGetConversation(activeChat?.receiverUid);

  // console.log(conversation);
  console.log(conversation);

  const { mutate: sendMessage } = useSendMessage();

  const handleSend = () => {
    if (!navigator.onLine) {
      alert("Please check your internet connection");
      return;
    }

    if (message.length === 0) {
      return;
    }

    sendMessage({
      sentAt: serverTimestamp(),
      // @ts-ignore
      senderUid: auth.currentUser?.uid,
      // @ts-ignore
      receiverUid: activeChat?.receiverUid,
      content: {
        text: message,
        image: null,
      },
    });

    dispatch(setMessage(""));
  };

  return (
    <div
      className={
        !activeChat
          ? styles.conversationBoxContainer
          : styles.conversationBoxContainerActive
      }
    >
      {activeChat && (
        <div className={styles.conversationBox}>
          <div className={styles.conversationBox__header}>
            <div className={styles.conversationBox__header_chatInfo}>
              <button onClick={() => dispatch(closeActiveChat())}>
                <FiArrowLeft />
              </button>

              <button>
                <Image
                  src={activeChat.receiverProfileImage ?? defaultProfileImage}
                  alt=""
                  width={300}
                  height={300}
                />
              </button>

              <div>
                <h3>
                  {activeChat?.receiverFirstName} {activeChat?.receiverLastName}
                </h3>
                <span>Online</span>
              </div>
            </div>

            <button onClick={() => dispatch(closeActiveChat())}>
              <FiX />
            </button>
          </div>
          {/* 
          <div className={styles.conversationBox__messages}>
            <Message type="received" text="Hi" />
            <Message type="sent" text="Hello" />
            <Message type="received" text="How are you doing?" />
            <Message type="received" text="And how is your day unfolding?" />
          </div> */}

          <div className={styles.conversationBox__messages}>
            {conversation.length > 0 &&
              conversation[0].messages.map((message) => (
                <Message
                  type={
                    auth.currentUser?.uid === message.senderUid
                      ? "sent"
                      : "received"
                  }
                  message={message}
                />
              ))}
          </div>

          <div className={styles.conversationBox__input}>
            <div className={styles.conversationBox__input_textarea}>
              <textarea
                name="message"
                id=""
                //   cols="30"
                //   rows="10"
                //   onClick={() => console.log("hello")}
                value={message}
                onChange={(e) => dispatch(setMessage(e.target.value))}
                placeholder="Message"
              />

              <input type="file" name="" id="attachment" />
              <label htmlFor="attachment">
                <FiImage />
              </label>
            </div>

            <button
              className={styles.conversationBox__input_sendBtn}
              onClick={handleSend}
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationBox;
