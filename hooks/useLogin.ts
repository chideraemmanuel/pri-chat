import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "react-query";

// export const useLogin = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   const { email, password } = credentials;

//   await signInWithEmailAndPassword(auth, email, password);
// };

const login = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;

  await signInWithEmailAndPassword(auth, email, password);
};

export const useLogin = () => {
  return useMutation(["login"], login);
};
