"use client";

import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import {
  setSignUpEmail,
  setSignUpFirstName,
  setSignUpLastName,
  setSignUpPassword,
} from "@/redux/slices/signInSlice";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "@/redux/slices/authSlice";

const SignUp: React.FC = () => {
  const { firstName, lastName, email, password } = useSelector(
    (store: StoreTypes) => store.signIn.signUp
  );

  const { isLoading, active } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const dispatch = useDispatch();

  const router = useRouter();

  // console.log("from sign up page", auth.currentUser);

  const { mutate: signUp, isLoading: isSigningUp } = useSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp({
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <>
      {!isLoading && !active && (
        <div className={styles.signUpPage}>
          <div className={styles.signUpPage__form}>
            <div className={styles.signUpPage__form_header}>
              <Logo />

              <div>
                <h2>Get started</h2>
                <p>Sign up to use PriChat.</p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <FormInput
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  setValue={setSignUpFirstName}
                />
                <FormInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  setValue={setSignUpLastName}
                />
              </div>
              <FormInput
                type="email"
                placeholder="Enter your email"
                value={email}
                setValue={setSignUpEmail}
              />
              <FormInput
                type="password"
                placeholder="Pick a password"
                value={password}
                setValue={setSignUpPassword}
              />

              {/* <button>Sign up</button> */}
              <button disabled={isSigningUp}>
                {isSigningUp ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
