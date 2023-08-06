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

const Homepage: React.FC = () => {
  const { isLoading, active } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const { searchBarActive } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const { data: user } = useGetUser(auth.currentUser?.uid);

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

                    <button>
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

            {!searchBarActive && <Chats uid="1" />}

            {searchBarActive && <SearchResults />}
          </div>
          <div className={styles.homepage__right}>
            <div className={styles.homepage__right_head}>
              <div>
                <button>
                  <Image src={profileImage} alt="" />
                </button>

                <div>
                  <h3>Sender's name</h3>
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className={styles.homepage__right_convo}>
              {/* <ConversationBox /> */}
            </div>

            {/* <div className={styles.homepage__right_input}>
          <div>
            <textarea
            name="message"
              id=""
              //   cols="30"
              //   rows="10"
              //   onClick={() => console.log("hello")}
              placeholder="Message"
              />
              
            <input type="file" name="" id="attachment" />
            <label htmlFor="attachment">
              <FiImage />
              </label>
              </div>

              <div>
              <FiSend />
              </div>
            </div> */}
          </div>
        </main>
      )}
    </>
  );
};

export default Homepage;
