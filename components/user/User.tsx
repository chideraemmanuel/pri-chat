"use client";

import Image from "next/image";
import styles from "./User.module.scss";
import profileImageAlt from "@/assets/profile.jpg";
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/redux/slices/chatsSlice";
import { closeSearchBar } from "@/redux/slices/navigationSlice";

interface Props {
  // id: string;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null;
}

const User: React.FC<Props> = ({ uid, profileImage, firstName, lastName }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setActiveChat({
        receiverUid: uid,
        receiverFirstName: firstName,
        receiverLastName: lastName,
        receiverProfileImage: profileImage,
      })
    );

    dispatch(closeSearchBar());
  };

  return (
    <div className={styles.user} onClick={handleClick}>
      <div className={styles.user__image}>
        <Image src={profileImage ?? profileImageAlt} alt="" />
      </div>
      <span>
        {firstName} {lastName}
      </span>
    </div>
  );
};

export default User;
