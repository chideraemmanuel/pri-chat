"use client";

import { FaUserPlus } from "react-icons/fa";
import styles from "./FindUsersToggle.module.scss";
import { useRouter } from "next/navigation";

const FindUsersToggle: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className={styles.findUserToggle}
      onClick={() => router.push("/home/find")}
    >
      <button>
        <FaUserPlus />
      </button>
    </div>
  );
};

export default FindUsersToggle;
