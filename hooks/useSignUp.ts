import { auth, db } from "@/config/firebase";
import { resetAllForms, setSignUpEmailError } from "@/redux/slices/signInSlice";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string | any>(null);

  const mutate = async (credentials: UserTypes) => {
    setIsLoading(true);

    const { firstName, lastName, email, password } = credentials;

    // MIGHT CHECK IF ANY REGISTERED USER ALREADY USES THE ENTERED EMAIL OR USE ERROR FROM TRY/CATCH
    // const q = query(usersCollectionReference, where('email', '==' email))
    // const response = await getDocs(q)
    // if (response.docs.length > 0) THEN IT'S IN USE

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
        firstName: firstName,
        lastName: lastName,
        email: email,
        // firstName: firstName.toLocaleLowerCase(),
        // lastName: lastName.toLocaleLowerCase(),
        // email: email.toLocaleLowerCase(),
        // displayName
        // displayPicture: null,
        profileImage: null,
      };

      await setDoc(userDocumentReference, data, { merge: true });

      dispatch(resetAllForms());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      // console.log(error);
      console.log(error.message);
      // ALERT ERROR HERE
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        console.log("email already in use");
        dispatch(setSignUpEmailError("Email already in use"));
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        alert("Network request failed. Please check your internet connection");
      }
    }
  };

  return { mutate, isLoading, error };
};
