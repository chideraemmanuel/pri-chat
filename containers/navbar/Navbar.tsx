"use client";

import { FiMenu, FiSearch } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { useGetUser } from "@/hooks/useGetUser";
import { auth } from "@/config/firebase";
import profileImage from "@/assets/profile.jpg";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import { toggleNavigationMenu } from "@/redux/slices/navigationSlice";

const Navbar: React.FC = () => {
  const { navigationMenuOpen } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const { data: currentUser } = useGetUser(auth.currentUser?.uid);

  const handleLogout = () => {
    dispatch(toggleNavigationMenu());
    signOut(auth);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__menu}>
        <button
          className={styles.navbar__menu_hamburger}
          onClick={() => dispatch(toggleNavigationMenu())}
        >
          <FiMenu />
        </button>

        {navigationMenuOpen && (
          <ul className={styles.navbar__menu_list}>
            <li>
              <Link
                href={"/profile"}
                onClick={() => dispatch(toggleNavigationMenu())}
              >
                Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        )}
      </div>

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
          <Image
            src={currentUser?.profileImage ?? profileImage}
            alt=""
            width={50}
            height={50}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
