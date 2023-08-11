"use client";

import FullScreenLoader from "@/components/fullScreenLoader/FullScreenLoader";
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
    dispatch(
      setCurrentUser({
        isLoading: true,
        active: false,
      })
    );

    if (user) {
      // dispatch(
      //   setCurrentUser({
      //     isLoading: false,
      //     active: true,
      //   })
      // );
      //   router.replace("/");
      // router.push("/home/chats");

      // USED TIMEOUT SO NAVIGATION DOESN'T HAPPEN IMMEDIATELY WHEN USER IS ACTIVE
      // THIS IS TO ENSURE THAT DURING SIGN UP, A USER DOCUMENT IS CREATED ON FIRESTORE BEFORE ROUTING TAKES PLACE.
      setTimeout(() => {
        dispatch(
          setCurrentUser({
            isLoading: false,
            active: true,
          })
        );

        router.push("/home/chats");
      }, 3000);
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

  const { isLoading: isAuthenticating, active: isAuthenticated } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  return (
    <>
      {/* {!isAuthenticating && isAuthenticated ? ( */}
      {!isAuthenticating ? <div>{children}</div> : <FullScreenLoader />}
    </>
  );
};

export default AuthContainer;
