import { auth, db } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// export const useSignUp = async (credentials: UserTypes) => {
//   const { firstName, lastName, email, password } = credentials;

//   const createdUser = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );

//   // const usersCollectionReference = collection(db, 'users')
//   // const usersDocumentReference = doc(db, 'users', auth.currentUser?.uid)

//   const { uid } = createdUser.user;
//   const usersDocumentReference = doc(db, "users", uid);

//   const data = {
//     // id: uid,
//     uid,
//     firstName,
//     lastName,
//     // displayName
//     // displayPicture: null,
//     profileImage: null,
//   };

//   await setDoc(usersDocumentReference, data, { merge: true });
// };

const signUp = async (credentials: UserTypes) => {
  const { firstName, lastName, email, password } = credentials;

  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const { uid } = createdUser.user;
  const usersDocumentReference = doc(db, "users", uid);

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

  await setDoc(usersDocumentReference, data, { merge: true });
};

export const useSignUp = () => {
  return useMutation(["sign up"], signUp);
};
