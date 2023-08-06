import { auth, db } from "@/config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

// // export const useGetChats = async (uid: string) => {
// //   const chatsReference = collection(db, `users/${uid}/chats`);

// //   const response = await getDocs(chatsReference);

// //   const data = response.docs.map((item) => {
// //     return { ...item.data(), id: item.id };
// //   });

// //   //   console.log(data);
// //   return data;
// // };

// // const getChats = async ({ queryKey }: { queryKey: any[] }) => {
// const getChats = async () => {
//   // const [data, setData] = useState<any>(null);

//   //   const uid = queryKey[1];

//   //   const chatsReference = collection(db, `users/${uid}/chats`);
//   const chatsReference = collection(db, `users/${auth.currentUser?.uid}/chats`);

//   const response = await getDocs(chatsReference);

//   onSnapshot(chatsReference, (snapshot) => {
//     const result = snapshot.docs.map((item) => {
//       return { ...item.data(), id: item.id };
//     });

//     // setData(result);
//     return result;
//   });

//   // console.log("Chats", data);
//   // return data;
// };

// // export const useGetChats = (uid: string) => {
// export const useGetChats = () => {
//   //   return useQuery(["get chats", uid], getChats);
//   return useQuery(["get chats", auth.currentUser?.uid], getChats);
// };

interface ChatTypes {
  senderUid: string;
  latestMessage: {
    sentAt: string;
    text: null | string;
    image: null | string;
  };
}

export const useGetChats = () => {
  const [data, setData] = useState<ChatTypes[]>([]);

  useEffect(() => {
    const chatsReference = collection(
      db,
      `users/${auth.currentUser?.uid}/chats`
    );

    const getChats = () => {
      const unsubscribe = onSnapshot(chatsReference, (snapshot) => {
        const result = snapshot.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });

        setData(result);
        // dispatch(setChats(result));
        console.log(result);
        // return result;
      });

      return () => {
        unsubscribe();
      };
    };

    auth.currentUser?.uid && getChats();
  }, []);

  return data;
};
