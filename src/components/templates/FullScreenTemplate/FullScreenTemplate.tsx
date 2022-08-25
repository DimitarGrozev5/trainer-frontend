import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../UI-elements/Button/Button";

import styles from "./FullScreenTemplate.module.css";

const FullScreenTemplate = () => {
  return (
    <div className={styles.container}>
      <header>
        <Button to="/" plain>
          {"<"}
        </Button>
        <h1>In Session</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default FullScreenTemplate;
