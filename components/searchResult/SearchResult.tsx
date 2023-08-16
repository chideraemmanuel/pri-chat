import Image from "next/image";
import styles from "./SearchResult.module.scss";
import defaultProfileImage from "@/assets/profile.jpg";
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/redux/slices/chatsSlice";
import { closeSearchBar } from "@/redux/slices/navigationSlice";

interface Props {
  // id: string;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null;
}

const SearchResult: React.FC<Props> = ({
  uid,
  profileImage,
  firstName,
  lastName,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setActiveChat({
        receiverUid: uid,
        receiverFirstName: firstName,
        receiverLastName: lastName,
        receiverProfileImage: profileImage,
      })
    );

    dispatch(closeSearchBar());
  };

  return (
    <div className={styles.searchResult} onClick={handleClick}>
      <div className={styles.searchResult__image}>
        <Image
          src={profileImage ?? defaultProfileImage}
          alt=""
          width={300}
          height={300}
        />
      </div>
      <span>
        {firstName} {lastName}
      </span>
    </div>
  );
};

export default SearchResult;
