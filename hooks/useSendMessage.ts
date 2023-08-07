import { db } from "@/config/firebase";
import {
  FieldValue,
  Timestamp,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useMutation } from "react-query";

interface MessageTypes {
  //   sentAt: Timestamp;
  sentAt: FieldValue;
  senderUid: string;
  receiverUid: string;
  content: {
    text: string | null;
    image: string | null;
  };
}

const sendMessage = async (payload: MessageTypes) => {
  const { senderUid, receiverUid, content, sentAt } = payload;

  const senderChatsReference = doc(
    db,
    `users/${senderUid}/chats/${receiverUid}`
  );

  await setDoc(senderChatsReference, {
    senderUid: receiverUid,
    latestMessage: {
      sentAt: serverTimestamp(),
      ...content,
    },
  });

  const receiverChatsReference = doc(
    db,
    `users/${receiverUid}/chats/${senderUid}`
  );

  await setDoc(receiverChatsReference, {
    senderUid: senderUid,
    latestMessage: {
      sentAt: serverTimestamp(),
      ...content,
    },
  });

  const senderConversationReference = doc(
    db,
    `users/${senderUid}/chats/${receiverUid}/fullConversation/${receiverUid}`
  );

  await setDoc(
    senderConversationReference,
    {
      // messages: arrayUnion(payload),
      messages: arrayUnion({ senderUid, receiverUid, content }),
    },
    { merge: true }
  );

  const receiverConversationReference = doc(
    db,
    `users/${receiverUid}/chats/${senderUid}/fullConversation/${senderUid}`
  );

  await setDoc(
    receiverConversationReference,
    {
      // messages: arrayUnion(payload),
      messages: arrayUnion({ senderUid, receiverUid, content }),
    },
    { merge: true }
  );
};

export const useSendMessage = () => {
  return useMutation(["send message"], sendMessage);
};
