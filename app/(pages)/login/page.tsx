"use client";

import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from "@/redux/store";
import { setLoginEmail, setLoginPassword } from "@/redux/slices/signInSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const { email, password } = useSelector(
    (store: StoreTypes) => store.signIn.login
  );

  const { isLoading, active } = useSelector(
    (store: StoreTypes) => store.auth.currentUser
  );

  const dispatch = useDispatch();

  const router = useRouter();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     dispatch(
  //       setCurrentUser({
  //         isLoading: false,
  //         active: true,
  //       })
  //     );
  //     router.replace("/");
  //   } else if (!user) {
  //     dispatch(
  //       setCurrentUser({
  //         isLoading: false,
  //         active: false,
  //       })
  //     );
  //   }
  // });

  return (
    <>
      {!isLoading && !active && (
        <div className={styles.loginPage}>
          <div className={styles.loginPage__form}>
            <div className={styles.loginPage__form_header}>
              <Logo />

              <div>
                <h2>Welcome back</h2>
                <p>Enter your details to sign in.</p>
              </div>
            </div>

            <form>
              <FormInput
                type="email"
                placeholder="Enter your email"
                value={email}
                setValue={setLoginEmail}
              />
              <FormInput
                type="password"
                placeholder="Enter your password"
                value={password}
                setValue={setLoginPassword}
              />

              <button>Login</button>
            </form>

            <p>
              Don't have an account yet? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
