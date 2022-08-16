import React from "react";
import { nanoid } from "nanoid";

import styles from "./Input.module.css";
import { useTState } from "../../../hooks/useTState";

interface Props {
  label: string;
  type: "text" | "email" | "password";
  error?: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
}

const Input: React.FC<Props> = ({
  label,
  type,
  error,
  value,
  onChange,
  onBlur,
}) => {
  // Generate Id for accessibility purposes
  const id = `$label{}_${nanoid()}`;

  // Password visibility state
  const [showPassword, , { toggleState: toggleShowPassword }] =
    useTState(false);

  // Setup class names
  const classNames = [styles["text-input"]];

  const invalid = error && error.length;
  invalid && classNames.push(styles.error);

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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
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
        <input
          className={classNames.join(" ")}
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {invalid && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
