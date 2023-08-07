import Link from "next/link";
import styles from "./BottomNavigation.module.scss";
import { FaComments, FaUserPlus } from "react-icons/fa";

const BottomNavigation: React.FC = () => {
  return (
    <div className={styles.bottomNavigation}>
      <Link href="/home/chats">
        <FaComments />
      </Link>

      <Link href="/home/find">
        <FaUserPlus />
      </Link>
    </div>
  );
};

export default BottomNavigation;
