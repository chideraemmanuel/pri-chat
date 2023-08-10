"use client";

import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./page.module.scss";
import User from "@/components/user/User";
import { useGetUsers } from "@/hooks/useGetUsers";

const users = [
  {
    uid: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    profileImage: null,
  },
  {
    uid: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "3",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "4",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "5",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "6",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "7",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "8",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "9",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
  {
    uid: "10",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    profileImage: null,
  },
];

const FindUsersPage: React.FC = () => {
  const { data: users, isLoading } = useGetUsers();

  return (
    <div className={styles.findUsersPage}>
      <SearchInput />

      <span>Find Users</span>

      <div className={styles.findUsersPage__users}>
        {users?.map((user) => (
          <User {...user} key={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default FindUsersPage;
