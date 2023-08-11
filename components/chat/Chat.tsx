import Image from "next/image";
import styles from "./Chat.module.scss";
import profileImage from "@/assets/profile.jpg";
import { useGetUser } from "@/hooks/useGetUser";
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/redux/slices/chatsSlice";
import { auth } from "@/config/firebase";
import { FaCheck } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { ChatTypes } from "@/hooks/useGetChats";

// interface Props {
//   chatId: string;
//   sentAt: Timestamp;
//   latestMessage: {
//     senderUid: string;
//     text: null | string;
//     image: null | string;
//   };
// }

const Chat: React.FC<ChatTypes> = ({
  chatId,
  sentAt,
  latestMessage: { senderUid, text, image },
}) => {
  const { data: sender } = useGetUser(chatId);
  console.log(chatId);
  console.log(sender);

  const dispatch = useDispatch();

  // console.log(senderUid);
  // console.log(auth.currentUser?.uid);

  const handleClick = () => {
    dispatch(
      setActiveChat({
        receiverUid: sender?.uid,
        receiverFirstName: sender?.firstName,
        receiverLastName: sender?.lastName,
        receiverProfileImage: sender?.profileImage,
      })
    );
  };

  return (
    <>
      {sender && (
        <div className={styles.chat} onClick={handleClick}>
          <div className={styles.chat__info}>
            <div className={styles.chat__info_image}>
              <Image src={sender?.profileImage ?? profileImage} alt="" />
            </div>
            <div className={styles.chat__info_content}>
              <h3>
                {sender?.firstName} {sender?.lastName}
              </h3>

              {text && (
                <p>
                  {senderUid === auth.currentUser?.uid && <FaCheck />} {text}
                </p>
              )}
            </div>
          </div>

          <div className={styles.chat__tag}>
            <span className={styles.chat__tag_time}>
              {moment(sentAt.toDate()).format("LT")}
            </span>
            {/* <span className={styles.chat__tag_time}>9:37 PM</span> */}
            {/* <div className={styles.chat__tag_unread}></div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
