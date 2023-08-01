import Chats from "@/containers/chats/Chats";
import styles from "./page.module.scss";
import { FiMenu, FiSearch } from "react-icons/fi";
import profileImage from "@/assets/profile.jpg";
import Image from "next/image";

const Homepage: React.FC = () => {
  return (
    <main className={styles.homepage}>
      <div className={styles.homepage__left}>
        <div className={styles.homepage__left_head}>
          <button>
            <FiMenu />
          </button>

          <div>
            <button>
              <FiSearch />
            </button>

            <button>
              <Image src={profileImage} alt="" />
            </button>
          </div>
        </div>
        <Chats />
      </div>
      <div className={styles.homepage__right}>
        <div className={styles.homepage__right_head}>
          <div>
            <button>
              <Image src={profileImage} alt="" />
            </button>

            <div>
              <h3>Sender's name</h3>
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className={styles.homepage__right_convo}>
          <span>convo</span>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
