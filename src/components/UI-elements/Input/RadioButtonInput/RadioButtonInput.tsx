import React from "react";
import { eqArr } from "../../../../util/array";

import styles from "./RadioButtonInput.module.css";

export interface RadioOption {
  label: string;
  value: any;
}

interface Props {
  value: any;
  onChange: (val: any) => () => void;
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
            checked={
              Array.isArray(value) ? eqArr(value, op.value) : value === op.value
            }
            onChange={onChange(op.value)}
          />
          {op.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonInput;
