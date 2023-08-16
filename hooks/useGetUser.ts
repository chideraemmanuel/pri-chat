import { auth, db } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { useQuery } from "react-query";

interface UserTypes {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null | string;
}

// const getUser = async ({ queryKey }: { queryKey: any[] }) => {
//   const uid = queryKey[1];

//   // @ts-ignore
//   const userReference = doc(db, `users`, uid);

//   const response = await getDoc(userReference);

//   const result: UserTypes = { ...response.data() };

//   return result;
// };

// export const useGetUser = (uid: string) => {
//   return useQuery(["get user", uid], getUser);
// };

export const useGetUser = (uid: string) => {
  // const [user, setUser] = useState<null | UserTypes>(null);
  const [data, setData] = useState<null | UserTypes>(null);

  const userReference = doc(db, `users`, uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(userReference, (snapshot) => {
      const result: UserTypes = snapshot.data();

      console.log(result);

      setData(result);
      // return { ...snapshot.data() };
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { data };
};
