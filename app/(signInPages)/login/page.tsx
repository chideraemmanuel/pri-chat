"use client";

import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import {
  clearLoginEmailError,
  clearLoginPasswordError,
  resetAllForms,
  resetErrors,
  resetLoginForm,
  setLoginEmail,
  setLoginEmailError,
  setLoginPassword,
  setLoginPasswordError,
} from "@/redux/slices/signInSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { FormEvent } from "react";
import FullScreenLoader from "@/components/fullScreenLoader/FullScreenLoader";

const LoginPage: React.FC = () => {
  const { email, password } = useSelector(
    (store: StoreTypes) => store.signIn.login
  );

  const { isLoading: isAuthenticating, active: isAuthenticated } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const { mutate: login, isLoading: isLoggingIn } = useLogin();

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetErrors());

    if (email.value.length === 0) {
      dispatch(setLoginEmailError("Please enter your email"));
      return;
    }
    if (!emailRegex.test(email.value)) {
      dispatch(setLoginEmailError("Please enter a valid email"));
      return;
    }
    if (password.value.length === 0) {
      dispatch(setLoginPasswordError("Please enter your password"));
      return;
    }

    await login({
      email: email.value,
      password: password.value,
    });

    // dispatch(resetAllForms());
  };

  return (
    <>
      {isLoggingIn && <FullScreenLoader />}

      {!isAuthenticating && !isAuthenticated && (
        <div className={styles.loginPage}>
          <div className={styles.loginPage__form}>
            <div className={styles.loginPage__form_header}>
              <Logo />

              <div>
                <h2>Welcome back</h2>
                <p>Enter your details to sign in.</p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <FormInput
                type="text"
                placeholder="Enter your email"
                value={email.value}
                setValue={setLoginEmail}
                error={email.error}
                clearError={clearLoginEmailError}
              />
              <FormInput
                type="password"
                placeholder="Enter your password"
                value={password.value}
                setValue={setLoginPassword}
                error={password.error}
                clearError={clearLoginPasswordError}
              />

              <button disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Login"}
              </button>
            </form>

            <p>
              Don't have an account yet?{" "}
              <Link href="/signup" onClick={() => dispatch(resetLoginForm())}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
