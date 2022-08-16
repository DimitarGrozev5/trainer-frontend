import React from "react";
import { nanoid } from "nanoid";

import styles from "./Input.module.css";
import { useTState } from "../../../hooks/useTState";

interface Props {
  label: string;
  type: "text" | "email" | "password";
}

const Input: React.FC<Props> = ({ label, type }) => {
  const id = `$label{}_${nanoid()}`;

  const [showPassword, , { toggleState: toggleShowPassword }] =
    useTState(false);

  const classNames = [styles["text-input"]];

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {type === "password" && (
        <div className={styles.password}>
          <input
            className={classNames.join(" ")}
            type={showPassword ? "text" : "password"}
            id={id}
            name={id}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.password}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      )}
      {type !== "password" && (
        <input className={classNames.join(" ")} type={type} id={id} name={id} />
      )}
    </div>
  );
};

export default Input;
