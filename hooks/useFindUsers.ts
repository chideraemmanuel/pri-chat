import { auth, db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";

interface UserTypes {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: null;
}

const findUsers = async ({ queryKey }: { queryKey: any[] }) => {
  const keyword = queryKey[1];

  const usersCollectionReference = collection(db, "users");

  const q = query(usersCollectionReference, where("firstName", "==", keyword));

  const response = await getDocs(q);

  const result: UserTypes[] = response.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });

  const filteredResult = result.filter(
    (user) => user.uid !== auth.currentUser?.uid
  );

  return filteredResult;
};

export const useFindUsers = (keyword: string) => {
  return useQuery(["find users", keyword], findUsers);
};
