"use client";

import { FiArrowLeft, FiImage } from "react-icons/fi";
import styles from "./page.module.scss";
import Image from "next/image";
import defaultProfileImage from "@/assets/profile.jpg";
import FormInput from "@/components/formInput/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import {
  setProfileFirstName,
  setProfileImageSrc,
  setProfileLastName,
} from "@/redux/slices/profileSlice";
import { useGetUser } from "@/hooks/useGetUser";
import { auth } from "@/config/firebase";
import { useEditProfile } from "@/hooks/useEditProfile";
import FullScreenLoader from "@/components/fullScreenLoader/FullScreenLoader";
import { useRouter } from "next/navigation";

const ProfileEditPage: React.FC = () => {
  const { data: currentUser } = useGetUser(auth.currentUser?.uid);

  const { firstName, lastName, profileImage } = useSelector(
    (store: StoreTypes) => store.profile
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate: editProfile, isLoading } = useEditProfile();

  const handleEditProfile = async () => {
    if (!navigator.onLine) {
      alert("Please check your internet connection");
      return;
    }

    await editProfile({ firstName, lastName, profileImage });

    router.replace("/profile");
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}

      <div className={styles.profileEditPage}>
        <div className={styles.profileEditPage__header}>
          <button
            className={styles.profileEditPage__header_back}
            onClick={() => history.back()}
          >
            <FiArrowLeft />
          </button>

          <h3 className={styles.profileEditPage__header_title}>Edit Profile</h3>
        </div>

        <div className={styles.profileEditPage__body}>
          <div className={styles.profileEditPage__body_image}>
            <input
              type="file"
              name=""
              id="profileImage"
              onChange={(e) => dispatch(setProfileImageSrc(e.target.files[0]))}
              // onChange={(e) => console.log(e.target.files?.[0])}
            />
            <label htmlFor="profileImage">
              <FiImage />
            </label>

            {/* <Image src={profileImage ?? defaultProfileImage} alt="" /> */}
            <Image
              src={currentUser?.profileImage ?? defaultProfileImage}
              alt=""
              width={300}
              height={300}
            />
          </div>

          <div className={styles.profileEditPage__body_info}>
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => dispatch(setProfileFirstName(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last name</label>

              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => dispatch(setProfileLastName(e.target.value))}
              />
            </div>

            <button
              disabled={
                firstName === currentUser?.firstName &&
                lastName === currentUser?.lastName &&
                profileImage === currentUser?.profileImage
              }
              onClick={handleEditProfile}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
