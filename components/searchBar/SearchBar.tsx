import { FiArrowLeft, FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchKeyword,
  closeSearchBar,
  setSearchKeyword,
} from "@/redux/slices/navigationSlice";
import { ChangeEvent } from "react";
import { StoreTypes } from "@/redux/store";

const SearchBar: React.FC = () => {
  const { searchKeyword } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <div className={styles.searchBar}>
      <button
        onClick={() => {
          dispatch(closeSearchBar());
          dispatch(clearSearchKeyword());
        }}
      >
        <FiArrowLeft />
      </button>

      <form>
        <input
          type="text"
          placeholder="Search for user"
          value={searchKeyword}
          //   onKeyUp={(e) => console.log(e.key)}
          onChange={(e) => handleChange(e)}
        />

        <button>
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
