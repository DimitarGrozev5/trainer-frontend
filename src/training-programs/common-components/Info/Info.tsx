import React from "react";

import styles from "./Info.module.css";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Info: React.FC<Props> = ({ children }) => {
  return <div className={styles.info}>{children}</div>;
};

export default Info;
