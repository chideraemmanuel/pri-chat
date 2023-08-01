import Logo from "@/components/logo/Logo";
import styles from "./page.module.scss";
import FormInput from "@/components/formInput/FormInput";

const SignUp: React.FC = () => {
  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpPage__form}>
        <div className={styles.signUpPage__form_header}>
          <Logo />

          <div>
            <h2>Get started</h2>
            <p>Sign up to use PriChat.</p>
          </div>
        </div>

        <form>
          <div>
            <FormInput type="text" placeholder="First Name" />
            <FormInput type="text" placeholder="Last Name" />
          </div>
          <FormInput type="email" placeholder="Enter your email" />
          <FormInput type="password" placeholder="Pick a password" />

          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
