import { auth, db } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// export const useSignUp = async (email: string, password: string) => {
export const useSignUp = async (data: UserTypes) => {
  const { email, password } = data;

  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // const usersCollectionReference = collection(db, 'users')
  // const usersDocumentReference = doc(db, 'users', auth.currentUser?.uid)

  const { uid } = createdUser.user;
  const usersDocumentReference = doc(db, "users", uid);

  await setDoc(usersDocumentReference, data, { merge: true });
};

// FOR USER LAYOUT ON DB
// export const getUserConstants = (
//   tweetAuthorUID: string,
//   tweetContent: string
// ) => {
//   return {
//     // id: string;
//     createdAt: serverTimestamp(),
//     tweetAuthorUID,
//     tweetContent: {
//       text: tweetContent,
//       // images
//     },
//     tweetStats: {
//       likes: [],
//       comments: 0,
//     },
//   };
// };
