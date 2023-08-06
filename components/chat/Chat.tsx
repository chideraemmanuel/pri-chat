import Image from "next/image";
import styles from "./Chat.module.scss";
import profileImage from "@/assets/profile.jpg";
import { useGetUser } from "@/hooks/useGetUser";

interface Props {
  senderUid: string;
  createdAt: string;
  latestMessage: {
    text: string;
    image: null | string;
  };
}

const Chat: React.FC<Props> = ({
  senderUid,
  createdAt,
  latestMessage: { text, image },
}) => {
  const { data: sender } = useGetUser(senderUid);

  return (
    <>
      {sender && (
        <div className={styles.chat}>
          <div className={styles.chat__info}>
            <div className={styles.chat__info_image}>
              <Image src={sender?.profileImage ?? profileImage} alt="" />
            </div>
            <div className={styles.chat__info_content}>
              <h3>
                {sender?.firstName} {sender?.lastName}
              </h3>
              {/* <p>What's up?</p> */}
              {text && <p>{text}</p>}
            </div>
          </div>

          <div className={styles.chat__tag}>
            <span className={styles.chat__tag_time}>9:37 PM</span>
            <div className={styles.chat__tag_unread}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
