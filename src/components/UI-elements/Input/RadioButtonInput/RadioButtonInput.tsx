import React from "react";

import styles from "./RadioButtonInput.module.css";

export interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (val: string) => () => void;
  options: RadioOption[];
}

const RadioButtonInput: React.FC<Props> = ({ value, onChange, options }) => {
  return (
    <div className={styles["radio-contianer"]}>
      {options.map((op) => (
        <label key={op.value} className={styles["radio__label"]}>
          <input
            className={styles["radio__button"]}
            type="radio"
            checked={value === op.value}
            onChange={onChange(op.value)}
          />
          {op.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonInput;
