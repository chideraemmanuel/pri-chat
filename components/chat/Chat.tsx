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

interface Props {
  senderUid: string;
  sentAt: Timestamp;
  latestMessage: {
    text: null | string;
    image: null | string;
  };
}

const Chat: React.FC<Props> = ({
  senderUid,
  sentAt,
  latestMessage: { text, image },
}) => {
  const { data: sender } = useGetUser(senderUid);

  const dispatch = useDispatch();

  // console.log(senderUid);
  // console.log(auth.currentUser?.uid);

  const handleClick = () => {
    dispatch(
      setActiveChat({
        receiverUid: senderUid,
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
              {/* <p>What's up?</p> */}
              {/* {text && (
                <>
                  {senderUid === auth.currentUser?.uid ? (
                    <p>
                      <FaCheck /> {text}{" "}
                    </p>
                  ) : (
                    <p>
                      <FaCheck />
                      {text}
                    </p>
                  )}
                </>
              )} */}

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
