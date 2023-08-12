"use client";

import { FiArrowLeft, FiEdit, FiEdit2, FiEdit3 } from "react-icons/fi";
import styles from "./page.module.scss";
import Image from "next/image";
import profileImamge from "@/assets/profile.jpg";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePage__header}>
        <button
          className={styles.profilePage__header_back}
          onClick={() => history.back()}
        >
          <FiArrowLeft />
        </button>

        <h3 className={styles.profilePage__header_title}>Profile</h3>

        <button
          className={styles.profilePage__header_edit}
          onClick={handleEdit}
        >
          <FiEdit />
          {/* <FiEdit2 />
            <FiEdit3 /> */}
        </button>
      </div>

      <div className={styles.profilePage__body}>
        <div className={styles.profilePage__body_image}>
          <Image src={profileImamge} alt="" />
        </div>

        <div className={styles.profilePage__body_info}>
          <h4>Chidera Emmanuel</h4>
          <span>chideraemmanuel@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
