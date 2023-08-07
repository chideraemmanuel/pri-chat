import { auth, db } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { useQuery } from "react-query";

// export const useGetUser = async (uid: string) => {
//   // QUERY TO GET PARTICULAR USER
//   //   const usersCollectionReference = collection(db, 'users')
//   //   const q = query(usersCollectionReference, where("uid", "==", uid));

//   //   const response = await getDocs(q);

//   // console.log(response.docs[0]);
//   //   return { ...response.docs[0].data(), id: response.docs[0].id };

//   //   const userReference = doc(db, `users/${uid}`);
//   const userReference = doc(db, `users`, uid);

//   const response = await getDoc(userReference);
//   return { ...response.data(), id: response.id };
// };

interface UserTypes {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null;
}

const getUser = async ({ queryKey }: { queryKey: any[] }) => {
  const uid = queryKey[1];

  // @ts-ignore
  const userReference = doc(db, `users`, uid);

  const response = await getDoc(userReference);

  // const result: UserTypes = { ...response.data(), id: response.id };
  const result: UserTypes = { ...response.data() };

  // console.log("User", response);
  //   console.log("User", { ...response.data(), id: response.id });
  return result;
};

export const useGetUser = (uid: string) => {
  return useQuery(["get user", uid], getUser);
};
