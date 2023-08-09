"use client";

import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import {
  resetAllForms,
  resetErrors,
  resetSignInForm,
  setSignUpEmail,
  setSignUpEmailError,
  setSignUpFirstName,
  setSignUpFirstNameError,
  setSignUpLastName,
  setSignUpLastNameError,
  setSignUpPassword,
  setSignUpPasswordError,
} from "@/redux/slices/signInSlice";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { error } from "console";
import FullScreenLoader from "@/components/fullScreenLoader/FullScreenLoader";

const SignUp: React.FC = () => {
  const { firstName, lastName, email, password } = useSelector(
    (store: StoreTypes) => store.signIn.signUp
  );

  const { isLoading: isAuthenticating, active: isAuthenticated } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const dispatch = useDispatch();

  const router = useRouter();

  // console.log("from sign up page", auth.currentUser);

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  // const validateform = () => {
  //   if (firstName.value.length === 0) {
  //     dispatch(setSignUpFirstNameError("Please fill out this field"));
  //     return;
  //   }
  //   if (lastName.value.length === 0) {
  //     dispatch(setSignUpLastNameError("Please fill out this field"));
  //     return;
  //   }
  //   if (email.value.length === 0) {
  //     dispatch(setSignUpEmailError("Please fill out this field"));
  //     return;
  //   }
  //   if (!emailRegex.test(email.value)) {
  //     dispatch(setSignUpEmailError("Please enter a valid email"));
  //     return;
  //   }
  //   if (password.value.length < 6) {
  //     dispatch(setSignUpPasswordError("Password should be up to 6 characters"));
  //     return;
  //   }
  // };

  // const { mutate: signUp, isLoading: isSigningUp } = useSignUp();
  const { mutate: signUp, isLoading: isSigningUp, error } = useSignUp();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetErrors());

    if (firstName.value.length === 0) {
      dispatch(setSignUpFirstNameError("Please fill out this field"));
      return;
    }
    if (lastName.value.length === 0) {
      dispatch(setSignUpLastNameError("Please fill out this field"));
      return;
    }
    if (email.value.length === 0) {
      dispatch(setSignUpEmailError("Please fill out this field"));
      return;
    }
    if (!emailRegex.test(email.value)) {
      dispatch(setSignUpEmailError("Please enter a valid email"));
      return;
    }
    if (password.value.length < 6) {
      dispatch(setSignUpPasswordError("Password should be up to 6 characters"));
      return;
    }

    // console.log("sign up ran when form not validated");

    await signUp({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });

    if (error) {
      // DON'T RESET FORM FIELDS IF THERE ARE ANY ERRORS
      console.log(error);
      console.log("will not reset form fields");
      return;
    }

    // dispatch(resetAllForms());
  };

  return (
    <>
      {isSigningUp && <FullScreenLoader />}

      {!isAuthenticating && !isAuthenticated && (
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
                  value={firstName.value}
                  setValue={setSignUpFirstName}
                  error={firstName.error}
                />
                <FormInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName.value}
                  setValue={setSignUpLastName}
                  error={lastName.error}
                />
              </div>
              <FormInput
                // type="email"
                type="text"
                placeholder="Enter your email"
                value={email.value}
                setValue={setSignUpEmail}
                error={email.error}
              />
              <FormInput
                type="password"
                placeholder="Pick a password"
                value={password.value}
                setValue={setSignUpPassword}
                error={password.error}
              />

              {/* <button>Sign up</button> */}
              <button disabled={isSigningUp}>
                {isSigningUp ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <p>
              Already have an account?{" "}
              <Link href="/login" onClick={() => dispatch(resetSignInForm())}>
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
