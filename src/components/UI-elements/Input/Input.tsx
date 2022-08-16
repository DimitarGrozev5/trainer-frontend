import React from "react";
import { nanoid } from "nanoid";
import styles from "./Input.module.css";

interface Props {
  label: string;
  type: "text" | "email" | "password";
}

const Input: React.FC<Props> = ({ label, type }) => {
  const id = `$label{}_${nanoid()}`;
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles["text-input"]} type={type} id={id} name={id} />
    </div>
  );
};

export default Input;
