import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
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
          <FormInput type="email" placeholder="Enter your email" />
          <FormInput type="password" placeholder="Enter your password" />

          <button>Login</button>
        </form>

        <p>
          Don't have an account yet? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
