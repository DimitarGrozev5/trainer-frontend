import React from "react";
import styles from "./H.module.css";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const H1: React.FC<Props> = ({ children }) => (
  <h1 className={styles.h1}>{children}</h1>
);

export const H2: React.FC<Props> = ({ children }) => (
  <h2 className={styles.h2}>{children}</h2>
);

export const H3: React.FC<Props> = ({ children }) => (
  <h3 className={styles.h3}>{children}</h3>
);
