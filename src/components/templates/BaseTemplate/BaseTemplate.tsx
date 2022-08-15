import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./BaseTemplate.module.css";

const BaseTemplate = () => {
  useEffect(() => {
    const scroll = (event: Event) => {
      console.log(event);
    };
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <h1>Trainer</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseTemplate;
