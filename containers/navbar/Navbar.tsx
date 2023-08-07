"use client";

import { FiMenu, FiSearch } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { useGetUser } from "@/hooks/useGetUser";
import { auth } from "@/config/firebase";
import profileImage from "@/assets/profile.jpg";

const Navbar: React.FC = () => {
  const { data: user } = useGetUser(auth.currentUser?.uid);

  return (
    <div className={styles.navbar}>
      <button className={styles.navbar__hamburger}>
        <FiMenu />
      </button>

      <div className={styles.navbar__right}>
        <button
          className={styles.navbar__right_search}
          // onClick={() => dispatch(openSearchBar())}
        >
          <FiSearch />
        </button>

        <button
          className={styles.navbar__right_profile}
          // onClick={() => dispatch(setActiveChat("okay"))}
        >
          <Image src={user?.profileImage ?? profileImage} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
