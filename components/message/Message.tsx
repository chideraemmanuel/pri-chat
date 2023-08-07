import { FieldValue } from "firebase/firestore";
import styles from "./Message.module.scss";

interface Props {
  type: "received" | "sent";
  message: {
    // sentAt: FieldValue;
    senderUid: string;
    receiverUid: string;
    content: {
      text: string | null;
      image: string | null;
    };
  };
}

const Message: React.FC<Props> = ({ type, message }) => {
  return (
    <div
      className={
        type === "received" ? styles.message_received : styles.message_sent
      }
    >
      <p>{message.content.text}</p>

      <span>09:31 AM</span>
    </div>
  );
};

export default Message;
