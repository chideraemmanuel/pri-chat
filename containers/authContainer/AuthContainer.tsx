"use client";

import { auth } from "@/config/firebase";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

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
      router.push("/");
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

  return <>{children}</>;
};

export default AuthContainer;
