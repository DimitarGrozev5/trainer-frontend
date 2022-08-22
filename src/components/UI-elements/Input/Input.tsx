import React from "react";
import { nanoid } from "nanoid";

import styles from "./Input.module.css";
import { useTState } from "../../../hooks/useTState";

// Props type definitions
// interface Props {
//   label: string;
//   type: "text" | "email" | "password";
//   error?: string;
//   value: string;
//   onChange: (val: string) => void;
//   onBlur?: (val: string) => void;
//   addClearBtn?: boolean;
// }

interface CommonProps {
  label: string;
  error?: string;
}

type CombinationProps =
  | {
      type: "text" | "email";
      value: string;
      onChange: (val: string) => void;
      onBlur?: (val: string) => void;
      addClearBtn?: boolean;
    }
  | {
      type: "password";
      value: string;
      onChange: (val: string) => void;
      onBlur?: (val: string) => void;
      addClearBtn?: never;
    }
  | {
      type: "checkbox";
      value: boolean;
      onChange: (val: boolean) => void;
      onBlur?: never;
      addClearBtn?: never;
    };

type Props = CommonProps & CombinationProps;

const Input: React.FC<Props> = ({
  label,
  type,
  error,
  value,
  onChange,
  onBlur,
  addClearBtn,
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
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "text":
      case "email":
      case "password":
        return onChange(e.currentTarget.value);

      case "checkbox":
        return onChange(!value);

      default:
        break;
    }
  };
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onBlur && onBlur(e.currentTarget.value);

  let inputElement = <></>;
  switch (type) {
    case "text":
    case "password":
      inputElement = (
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

      // If the user needs a clear button
      if (addClearBtn) {
        inputElement = (
          <div className={styles.password}>
            <input
              className={classNames.join(" ")}
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
            <button
              type="button"
              onClick={onChange.bind(null, "")}
              className={styles.password}
            >
              {value && "Clear"}
            </button>
          </div>
        );
      }
      break;

    case "password":
      inputElement = (
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
      break;

    case "checkbox":
      inputElement = (
        <label>
          <input
            className={classNames.join(" ")}
            type="checkbox"
            id={id}
            name={id}
            checked={value}
            onChange={changeHandler}
          />
          {label}
        </label>
      );
      break;

    default:
      break;
  }

  return (
    <div className={`${styles.container} ${invalid ? styles.error : ""}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      {inputElement}

      {invalid && <div className={styles["error-box"]}>{error}</div>}
    </div>
  );
};

export default Input;
