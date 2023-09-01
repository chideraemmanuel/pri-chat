import { auth, db } from '@/config/firebase';
import {
  Timestamp,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

export interface ChatTypes {
  chatId: string;
  sentAt: Timestamp;
  latestMessage: {
    senderUid: string;
    text: null | string;
    image: null | string;
  };
}

export const useGetChats = () => {
  const [data, setData] = useState<ChatTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const chatsReference = collection(
      db,
      `users/${auth.currentUser?.uid}/chats`
    );

    const q = query(
      chatsReference,
      // orderBy("latestMessage"),
      // orderBy("sentAt", "asc")
      orderBy('sentAt', 'desc')
    );

    const getChats = () => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const result = snapshot.docs.map((item) => {
          return { ...item.data(), chatId: item.id };
        });

        // @ts-ignore
        setData(result);
        setIsLoading(false);
        // console.log(result);
      });

      return () => {
        unsubscribe();
      };
    };

    auth.currentUser?.uid && getChats();
  }, []);

  return { data, isLoading };
};
