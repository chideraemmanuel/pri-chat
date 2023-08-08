"use client";

import { useState } from "react";
import styles from "./FormInput.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  type: "text" | "email" | "password";
  placeholder: string;
  value: any;
  setValue: any;
}

const FormInput: React.FC<Props> = ({ type, placeholder, value, setValue }) => {
  const dispatch = useDispatch();

  const [passwordCurrentType, setPasswordCurrentType] = useState<
    "text" | "password"
  >("password");

  const handleVisibilityToggle = () => {
    if (passwordCurrentType === "password") {
      setPasswordCurrentType("text");
    } else {
      setPasswordCurrentType("password");
    }
  };

  return (
    <div className={styles.formInput}>
      <div className={styles.formInput__input}>
        <input
          type={type === "password" ? passwordCurrentType : type}
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
          className={value.length > 0 ? styles.formInput__input_valid : ""}
        />
        <span>{placeholder}</span>

        {type === "password" && (
          <div
            className={styles.formInput__input_passwordToggle}
            onClick={handleVisibilityToggle}
          >
            {passwordCurrentType === "password" ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      <span className={styles.formInput__error}>Error here!</span>
    </div>
  );
};

export default FormInput;
