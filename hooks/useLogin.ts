import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetAllForms,
  setLoginEmailError,
  setLoginPasswordError,
} from "@/redux/slices/signInSlice";

// const login = async (credentials: { email: string; password: string }) => {
//   const { email, password } = credentials;

//   await signInWithEmailAndPassword(auth, email, password);
// };

// export const useLogin = () => {
//   return useMutation(["login"], login);
// };

export const useLogin = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string | any>(null);

  const mutate = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);

    const { email, password } = credentials;

    // MIGHT CHECK IF USER EXISTS OR USE ERROR FROM TRY/CATCH
    // const q = query(usersCollectionReference, where('email', '==' email))
    // const response = await getDocs(q)
    // if (response.docs.length > 0) THEN USER EXISTS

    try {
      await signInWithEmailAndPassword(auth, email, password);

      dispatch(resetAllForms());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.log(error.message);
      // ALERT ERROR HERE
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        dispatch(setLoginPasswordError("Incorrect password"));
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        dispatch(setLoginEmailError("No account with this email"));
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        alert("Network request failed. Please check your internet connection");
      }
    }
  };

  return { mutate, isLoading, error };
};
