import React from "react";
import { nanoid } from "nanoid";

import styles from "./Input.module.css";
import { useTState } from "../../../hooks/useTState";

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

  // Setup class names
  const classNames = [styles["text-input"]];

  const invalid = error && error.length;
  invalid && classNames.push(styles.error);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value);

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onBlur && onBlur(e.currentTarget.value);

  return (
    <div className={`${styles.container} ${invalid ? styles.error : ""}`}>
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
      )}
      {type !== "password" && (
        <input
          className={classNames.join(" ")}
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      )}
      {invalid && <div className={styles["error-box"]}>{error}</div>}
    </div>
  );
};

export default Input;