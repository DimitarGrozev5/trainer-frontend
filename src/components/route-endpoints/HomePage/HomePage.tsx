import { useState } from "react";
import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Card>Get ready to train</Card>
      <Card>
        <form className={styles.form}>
          <h2>{isLogin ? "Login" : "Register"}</h2>

          <Input label="Email:" type="email" />
          <Input label="Password:" type="password" />

          <Button type="submit">Login</Button>
        </form>
      </Card>
    </>
  );
};

export default HomePage;
