import React from "react";
import styles from "./Card.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ className, children }) => {
  const classes = [styles.card];
  className && classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
};

export default Card;
