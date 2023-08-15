import { auth, db, storage } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useMutation } from "react-query";

interface PayloadTypes {
  firstName?: string;
  lastName?: string;
  profileImage?: File;
}

export const useEditProfile = () => {
  const [data, setData] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (payload: PayloadTypes) => {
    setIsLoading(true);

    const { profileImage } = payload;

    if (profileImage) {
      // upload to storage
      console.log(profileImage);
      const fileFormat = profileImage.type.split("/")[1];
      const storageRef = ref(
        storage,
        `usersProfileImages/${auth.currentUser?.uid}.${fileFormat}`
      );

      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      uploadTask.on(
        "state_changed",
        // ON RESUME
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        // ON ERROR
        (error) => {
          alert(error.message);
        },
        // ON SUCCESS
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          // setProfileImageUrl(imageUrl);
          console.log(imageUrl);

          setData({
            ...payload,
            profileImage: imageUrl,
          });

          const userDocumentReference = doc(db, "users", auth.currentUser?.uid);

          // await setDoc(userDocumentReference, data, { merge: true });
          await setDoc(
            userDocumentReference,
            {
              ...payload,
              profileImage: imageUrl,
            },
            { merge: true }
          );

          setIsLoading(false);

          // console.log(data);
        }
      );
    } else {
      setData(payload);
      setIsLoading(false);
    }

    // try {
    //   // const data = {
    //   //   ...payload,
    //   //   profileImage: profileImageUrl,
    //   // };

    //   // console.log(data);

    //   // const userDocumentReference = doc(db, "users", auth.currentUser?.uid);

    //   // await setDoc(userDocumentReference, data, { merge: true });

    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return { mutate, isLoading };
};
