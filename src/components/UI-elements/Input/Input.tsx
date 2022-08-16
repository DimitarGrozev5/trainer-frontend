import React from "react";
import { nanoid } from "nanoid";

import styles from "./Input.module.css";
import { useTState } from "../../../hooks/useTState";

// Props type definitions
interface Props {
  label: string;
  type: "text" | "email" | "password";
  error?: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: (val: string) => void;
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

  // Setup class names for input
  const classNames = [styles["text-input"]];

  // Add invalid class if field is invalid
  const invalid = error && error.length;
  invalid && classNames.push(styles.error);

  // Create handlers for onChange and onBlur
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value);
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onBlur && onBlur(e.currentTarget.value);

  // Create Component for text or email Input
  let input = (
    <input
      className={classNames.join(" ")}
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );

  // Create Component for password input
  if (type === "password") {
    input = (
      <div className={styles.password}>
        <input
          className={classNames.join(" ")}
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className={styles.password}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${invalid ? styles.error : ""}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      {input}

      {invalid && <div className={styles["error-box"]}>{error}</div>}
    </div>
  );
};

export default Input;
