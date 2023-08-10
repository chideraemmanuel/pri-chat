"use client";

import Chats from "@/containers/chats/Chats";
import styles from "./page.module.scss";
import { FiImage, FiMenu, FiSearch, FiSend } from "react-icons/fi";
import profileImage from "@/assets/profile.jpg";
import Image from "next/image";
import ConversationBox from "@/containers/conversationBox/ConversationBox";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { useGetUser } from "@/hooks/useGetUser";
import { openSearchBar } from "@/redux/slices/navigationSlice";
import SearchBar from "@/components/searchBar/SearchBar";
import SearchResults from "@/containers/searchResults/SearchResults";
import { setActiveChat } from "@/redux/slices/chatsSlice";
import FindUsersToggle from "@/components/findUsersToggle/FindUsersToggle";
import FullScreenLoader from "@/components/fullScreenLoader/FullScreenLoader";

const ChatsPage: React.FC = () => {
  const { isLoading, active } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const { searchBarActive } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const { activeChat } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  const router = useRouter();

  const { data: user } = useGetUser(auth.currentUser?.uid);
  // console.log("user", user);
  // console.log(auth.currentUser);

  // signOut(auth);

  return (
    <div className={styles.chatsPage}>
      <Chats />

      {/* <FindUsersToggle /> */}
      {/* <FullScreenLoader /> */}
    </div>
  );
};

export default ChatsPage;
