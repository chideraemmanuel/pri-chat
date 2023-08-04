import Message from "@/components/message/Message";
import styles from "./ConversationBox.module.scss";
import { FiChevronsRight, FiClipboard, FiImage, FiSend } from "react-icons/fi";
import { FaClipboard } from "react-icons/fa";

const ConversationBox: React.FC = () => {
  return (
    <div className={styles.conversationBox}>
      <div className={styles.conversationBox__messages}>
        <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" />
        {/* <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" />
        <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" />
        <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" />
        <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" /> */}
      </div>
      <div className={styles.conversationBox__input}>
        <div>
          <textarea
            name="message"
            id=""
            //   cols="30"
            //   rows="10"
            //   onClick={() => console.log("hello")}
            placeholder="Message"
          />

          <input type="file" name="" id="attachment" />
          <label htmlFor="attachment">
            <FiImage />
          </label>
        </div>

        <div>
          <FiSend />
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
