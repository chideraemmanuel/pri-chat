import styles from "./Logo.module.scss";
import { FaComments } from "react-icons/fa";

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <FaComments />
      <span>PriChat</span>
    </div>
  );
};

export default Logo;
