// 'use client'

import Chats from "@/containers/chats/Chats";
import styles from "./page.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

const ChatsPage: React.FC = () => {
  // signOut(auth);

  return (
    <div className={styles.chatsPage}>
      <Chats />
    </div>
  );
};

export default ChatsPage;
