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

const Homepage: React.FC = () => {
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
  console.log("user", user);
  console.log(auth.currentUser);

  // signOut(auth);

  return (
    <>
      {!isLoading && active && (
        <main className={styles.homepage}>
          <div className={styles.homepage__left}>
            <div className={styles.homepage__left_head}>
              {!searchBarActive && (
                // <div className={styles.homepage__left_head__nav}>
                <>
                  <button>
                    <FiMenu />
                  </button>

                  <div>
                    <button onClick={() => dispatch(openSearchBar())}>
                      <FiSearch />
                    </button>

                    <button onClick={() => dispatch(setActiveChat("okay"))}>
                      <Image src={user?.profileImage ?? profileImage} alt="" />
                    </button>
                  </div>
                </>
                // </div>
              )}

              {/* <div className={styles.homepage__left_head__search}>

              </div> */}
              {searchBarActive && <SearchBar />}
            </div>

            {/* {!searchBarActive && !activeChat && <Chats uid="1" />} */}

            {!searchBarActive && (
              <div className={activeChat ? styles.homepage__left_chats : ""}>
                <Chats />
              </div>
            )}

            {searchBarActive && <SearchResults />}
          </div>

          {/* <div className={styles.homepage__convo}> */}
          <div
            className={
              !activeChat
                ? styles.homepage__convo
                : styles.homepage__convoActive
            }
          >
            <ConversationBox />
          </div>
        </main>
      )}
    </>
  );
};

export default Homepage;
