"use client";

import { FiArrowLeft, FiImage } from "react-icons/fi";
import styles from "./page.module.scss";
import Image from "next/image";
import profileImamge from "@/assets/profile.jpg";
import FormInput from "@/components/formInput/FormInput";

const ProfileEditPage: React.FC = () => {
  return (
    <div className={styles.profileEditPage}>
      <div className={styles.profileEditPage__header}>
        <button
          className={styles.profileEditPage__header_back}
          onClick={() => history.back()}
        >
          <FiArrowLeft />
        </button>

        <h3 className={styles.profileEditPage__header_title}>Profile</h3>

        {/* <button
          className={styles.profileEditPage__header_edit}
          onClick={handleEdit}
        >
          <FiEdit />
          <FiEdit2 />
            <FiEdit3 />
        </button> */}
      </div>

      <div className={styles.profileEditPage__body}>
        <div className={styles.profileEditPage__body_image}>
          <input type="file" name="" id="profileImage" />
          <label htmlFor="profileImage">
            <FiImage />
          </label>

          <Image src={profileImamge} alt="" />
        </div>

        <div className={styles.profileEditPage__body_info}>
          <FormInput type="text" placeholder="First Name" value="Chidera" />
          <FormInput type="text" placeholder="Last Name" value="Emmanuel" />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
