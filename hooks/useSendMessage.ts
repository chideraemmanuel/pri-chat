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
  // sentAt: Timestamp;
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

  // UPDATE ON SENDER'S CHATS
  const senderChatsReference = doc(
    db,
    `users/${senderUid}/chats/${receiverUid}`
  );

  await setDoc(senderChatsReference, {
    // senderUid: receiverUid,
    senderUid: senderUid,
    sentAt: serverTimestamp(),
    latestMessage: {
      // sentAt: serverTimestamp(),
      ...content,
    },
  });

  // UPDATE ON RECEIVER'S CHATS
  const receiverChatsReference = doc(
    db,
    `users/${receiverUid}/chats/${senderUid}`
  );

  await setDoc(receiverChatsReference, {
    senderUid: senderUid,
    sentAt: serverTimestamp(),
    latestMessage: {
      // sentAt: serverTimestamp(),
      ...content,
    },
  });

  // UPDATE ON SENDER'S CONVERSATION
  const senderConversationReference = doc(
    db,
    `users/${senderUid}/chats/${receiverUid}/fullConversation/${receiverUid}`
  );

  await setDoc(
    senderConversationReference,
    {
      // messages: arrayUnion(payload),
      messages: arrayUnion({
        senderUid,
        receiverUid,
        content,
        sentAt: Timestamp.now(),
      }),
    },
    { merge: true }
  );

  // UPDATE ON RECEIVER'S CONVERSATION
  const receiverConversationReference = doc(
    db,
    `users/${receiverUid}/chats/${senderUid}/fullConversation/${senderUid}`
  );

  await setDoc(
    receiverConversationReference,
    {
      // messages: arrayUnion(payload),
      messages: arrayUnion({
        senderUid,
        receiverUid,
        content,
        sentAt: Timestamp.now(),
      }),
    },
    { merge: true }
  );
};

export const useSendMessage = () => {
  return useMutation(["send message"], sendMessage);
};
