import { auth, db } from '@/config/firebase';
import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface MessageTypes {
  sentAt: Timestamp;
  senderUid: string;
  receiverUid: string;
  content: {
    text: string | null;
    image: string | null;
  };
}

interface ResultTypes {
  messages: MessageTypes[];
}

export const useGetConversation = (receiverUid: string) => {
  const [conversation, setConversation] = useState<ResultTypes[]>([]);

  // console.log(receiverUid);

  useEffect(() => {
    const conversationReference = collection(
      db,
      `users/${auth.currentUser?.uid}/chats/${receiverUid}/fullConversation`
    );

    // console.log(
    //   `users/${auth.currentUser?.uid}/chats/${receiverUid}/fullConversation`
    // );

    const getConversation = () => {
      const unsubscribe = onSnapshot(conversationReference, (snapshot) => {
        const result = snapshot.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });

        // @ts-ignore
        setConversation(result);
        // dispatch(setChats(result));
        console.log(result);
        // return result;
      });

      return () => {
        unsubscribe();
      };
    };

    auth.currentUser?.uid && getConversation();
  }, [receiverUid]);

  return conversation;
};
