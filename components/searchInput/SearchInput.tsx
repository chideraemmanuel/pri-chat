"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchInput.module.scss";
import { ChangeEvent } from "react";
import { StoreTypes } from "@/redux/store";
import { setSearchKeyword } from "@/redux/slices/navigationSlice";
import { FiSearch } from "react-icons/fi";

const SearchInput: React.FC = () => {
  const { searchKeyword } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <form className={styles.searchInput}>
      <input
        type="text"
        placeholder="Search for user"
        value={searchKeyword}
        onChange={(e) => handleChange(e)}
      />
      <button>
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchInput;
