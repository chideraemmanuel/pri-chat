"use client";

import { useState } from "react";
import styles from "./FormInput.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  type: "text" | "email" | "password";
  placeholder: string;
}

const FormInput: React.FC<Props> = ({ type, placeholder }) => {
  const [input, setInput] = useState("");

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
      {/* <label>Form Input!</label> */}
      <div className={styles.formInput__input}>
        <input
          type={type === "password" ? passwordCurrentType : type}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={input.length > 0 ? styles.formInput__input_valid : ""}
        />
        {/* <input type={type} placeholder={placeholder} /> */}
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
    </div>
  );
};

export default FormInput;