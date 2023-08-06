import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";

const findUsers = async ({ queryKey }: { queryKey: any[] }) => {
  const keyword = queryKey[1];

  const usersCollectionReference = collection(db, "users");

  const q = query(usersCollectionReference, where("firstName", "==", keyword));

  const response = await getDocs(q);

  const result = response.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });

  return result;
};

export const useFindUsers = (keyword: string) => {
  return useQuery(["find users", keyword], findUsers);
};
