import React from "react";

import styles from "./CircularButton.module.css";

interface Props {
  text: string;
  checked: boolean;
  grayed?: boolean;
  onClick: () => void;
}

const CircularButton: React.FC<Props> = ({
  text,
  checked,
  grayed = false,
  onClick,
}) => {
  const classes: string[] = [styles.button];
  checked && classes.push(styles.checked);
  grayed && !checked && classes.push(styles.grayed);

  return (
    <button onClick={onClick} type="button" className={classes.join(" ")}>
      {text}
    </button>
  );
};

export default CircularButton;
