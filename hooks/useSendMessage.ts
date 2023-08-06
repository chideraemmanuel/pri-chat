import { db } from "@/config/firebase";
import {
  FieldValue,
  Timestamp,
  arrayUnion,
  doc,
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

  const conversationReference = doc(
    db,
    `users/${senderUid}/chats/${receiverUid}/fullConversation/${receiverUid}`
  );

  await setDoc(
    conversationReference,
    {
      messages: arrayUnion(payload),
    },
    { merge: true }
  );
};

export const useSendMessage = () => {
  return useMutation(["send message"], sendMessage);
};
