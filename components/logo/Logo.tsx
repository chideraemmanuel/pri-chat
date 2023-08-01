import styles from "./Logo.module.scss";
import { FaComments } from "react-icons/fa";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <FaComments />
      <span>PriChat</span>
    </div>
  );
};

export default Logo;
