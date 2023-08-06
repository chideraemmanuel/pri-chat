import Message from "@/components/message/Message";
import styles from "./ConversationBox.module.scss";
import {
  FiArrowLeft,
  FiChevronsRight,
  FiClipboard,
  FiImage,
  FiSend,
  FiX,
} from "react-icons/fi";
import { FaClipboard } from "react-icons/fa";
import Image from "next/image";
import profileImage from "@/assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { closeActiveChat } from "@/redux/slices/chatsSlice";
import { StoreTypes } from "@/redux/store";

const ConversationBox: React.FC = () => {
  const { activeChat } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  return (
    <div className={styles.conversationBox}>
      <div className={styles.conversationBox__header}>
        <div className={styles.conversationBox__header_chatInfo}>
          <button onClick={() => dispatch(closeActiveChat())}>
            <FiArrowLeft />
          </button>

          <button>
            <Image src={profileImage} alt="" />
          </button>

          <div>
            <h3>Sender's name</h3>
            <span>Online</span>
          </div>
        </div>

        <button>
          <FiX />
        </button>
      </div>

      <div className={styles.conversationBox__messages}>
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
        <Message type="received" text="And how is your day unfolding?" />
        <Message type="received" text="Hi" />
        <Message type="sent" text="Hello" />
        <Message type="received" text="How are you doing?" />
        <Message type="received" text="And how is your day unfolding?" />
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
