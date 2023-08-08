import { auth, db } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useMutation } from "react-query";

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// const signUp = async (credentials: UserTypes) => {
//   const { firstName, lastName, email, password } = credentials;

//   const createdUser = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );

//   const { uid } = createdUser.user;
//   const usersDocumentReference = doc(db, "users", uid);

//   const data = {
//     // id: uid,
//     uid,
//     firstName: firstName.toLocaleLowerCase(),
//     lastName: lastName.toLocaleLowerCase(),
//     email: email.toLocaleLowerCase(),
//     // displayName
//     // displayPicture: null,
//     profileImage: null,
//   };

//   await setDoc(usersDocumentReference, data, { merge: true });
// };

// export const useSignUp = () => {
//   return useMutation(["sign up"], signUp);
// };

export const useSignUp = () => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string | any>(null);

  const mutate = async (credentials: UserTypes) => {
    const { firstName, lastName, email, password } = credentials;

    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = createdUser.user;
      const userDocumentReference = doc(db, "users", uid);

      const data = {
        // id: uid,
        uid,
        firstName: firstName.toLocaleLowerCase(),
        lastName: lastName.toLocaleLowerCase(),
        email: email.toLocaleLowerCase(),
        // displayName
        // displayPicture: null,
        profileImage: null,
      };

      await setDoc(userDocumentReference, data, { merge: true });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { mutate, isLoading, error };
};
