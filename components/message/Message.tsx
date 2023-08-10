import { FieldValue, Timestamp } from "firebase/firestore";
import styles from "./Message.module.scss";
import moment from "moment";

interface Props {
  type: "received" | "sent";
  message: {
    sentAt: Timestamp;
    senderUid: string;
    receiverUid: string;
    content: {
      text: string | null;
      image: string | null;
    };
  };
}

const Message: React.FC<Props> = ({ type, message }) => {
  const { sentAt } = message;
  return (
    <div
      className={
        type === "received" ? styles.message_received : styles.message_sent
      }
    >
      <p>{message.content.text}</p>

      {/* <span>09:31 AM</span> */}
      <span>{moment(sentAt.toDate()).format("LT")}</span>
    </div>
  );
};

export default Message;
