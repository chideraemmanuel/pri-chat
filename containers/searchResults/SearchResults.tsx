import { useFindUsers } from "@/hooks/useFindUsers";
import styles from "./SearchResults.module.scss";
import { useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import Chat from "@/components/chat/Chat";
import SearchResult from "@/components/searchResult/SearchResult";

const SearchResults: React.FC = () => {
  const { searchKeyword } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const { data: users, isLoading } = useFindUsers(searchKeyword);
  console.log(users);

  //   const users = [1, 2];

  return (
    <div className={styles.searchResults}>
      <span>Your search results will appear here</span>

      <div>
        {users?.map((user) => (
          <SearchResult name="Chidera Emmanuel" profileImage={null} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
