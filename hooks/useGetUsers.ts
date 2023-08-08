import { auth, db } from "@/config/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "react-query";

interface UserTypes {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null;
}

const getUsers = async () => {
  // const q = query()
  const usersCollectionReference = collection(db, "users");

  const response = await getDocs(usersCollectionReference);

  const result: UserTypes[] = response.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });

  const filteredResult = result.filter(
    (user) => user.uid !== auth.currentUser?.uid
  );

  return filteredResult;
};

export const useGetUsers = () => {
  return useQuery(["get users"], getUsers);
};
