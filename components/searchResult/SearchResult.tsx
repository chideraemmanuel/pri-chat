import Image from "next/image";
import styles from "./SearchResult.module.scss";
import profileImageAlt from "@/assets/profile.jpg";

interface Props {
  profileImage: string | null;
  name: string;
}

const SearchResult: React.FC<Props> = ({ profileImage, name }) => {
  return (
    <div className={styles.searchResult}>
      <div className={styles.searchResult__image}>
        <Image src={profileImage ?? profileImageAlt} alt="" />
      </div>
      <span>{name}</span>
    </div>
  );
};

export default SearchResult;
