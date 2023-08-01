import Image from "next/image";
import styles from "./Chat.module.scss";
import profileImage from "@/assets/profile.jpg";

const Chat: React.FC = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chat__info}>
        <div className={styles.chat__info_image}>
          <Image src={profileImage} alt="" />
        </div>
        <div className={styles.chat__info_content}>
          <h3>Sender's name</h3>
          <p>What's up?</p>
        </div>
      </div>

      <div className={styles.chat__tag}>
        <span className={styles.chat__tag_time}>9:37 PM</span>
        <div className={styles.chat__tag_unread}></div>
      </div>
    </div>
  );
};

export default Chat;
