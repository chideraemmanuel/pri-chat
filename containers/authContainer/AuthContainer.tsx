"use client";

import { auth } from "@/config/firebase";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { StoreTypes } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setCurrentUser({
          isLoading: false,
          active: true,
        })
      );
      //   router.replace("/");
      router.push("/home/chats");
    } else if (!user) {
      dispatch(
        setCurrentUser({
          isLoading: false,
          active: false,
        })
      );
      //   router.replace("/login");
      router.push("/login");
    }
  });

  const { isLoading, active } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  return <>{!isLoading && active && <div>{children}</div>}</>;
};

export default AuthContainer;
