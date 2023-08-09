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
  error: null | string;
}

const FormInput: React.FC<Props> = ({
  type,
  placeholder,
  value,
  setValue,
  error,
}) => {
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
    <div className={error ? styles.formInputError : styles.formInput}>
      <div
        className={
          error ? styles.formInputError__input : styles.formInput__input
        }
      >
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

      {error && (
        <span
          className={
            error ? styles.formInputError__errorMsg : styles.formInput__errorMsg
          }
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
