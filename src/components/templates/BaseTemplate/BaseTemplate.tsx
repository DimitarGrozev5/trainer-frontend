import { Outlet } from "react-router-dom";
import styles from "./BaseTemplate.module.css";

const BaseTemplate = () => {
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
