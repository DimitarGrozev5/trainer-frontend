import React from "react";

import styles from "./CheckBoxInput.module.css";

interface Props {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

const CheckBoxInput: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={value}
        onChange={onChange.bind(null, !value)}
      />
      {label}
    </label>
  );
};

export default CheckBoxInput;
