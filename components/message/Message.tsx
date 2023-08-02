import styles from "./Message.module.scss";

const Message: React.FC<{ type: "received" | "sent"; text: string }> = ({
  type,
  text,
}) => {
  return (
    // <div className={styles.message}>
    // <div className={styles.message_sent}>
    // <div className={styles.message_received}>
    <div
      className={
        type === "received" ? styles.message_received : styles.message_sent
      }
    >
      <p>{text}</p>

      <span>09:31 AM</span>
    </div>
  );
};

export default Message;
