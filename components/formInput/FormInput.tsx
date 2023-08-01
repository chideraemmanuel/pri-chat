"use client";

import { useState } from "react";
import styles from "./FormInput.module.scss";

interface Props {
  type: "text" | "email" | "password";
  placeholder: string;
}

const FormInput: React.FC<Props> = ({ type, placeholder }) => {
  const [input, setInput] = useState("");

  return (
    <div className={styles.formInput}>
      {/* <label>Form Input!</label> */}
      <div className={styles.formInput__input}>
        <input
          type={type}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={input.length > 0 ? styles.formInput__input_valid : ""}
        />
        {/* <input type={type} placeholder={placeholder} /> */}
        <span>{placeholder}</span>
      </div>
    </div>
  );
};

export default FormInput;
