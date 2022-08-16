import { useState } from "react";
import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = (
    <>
      <Input label="Email:" type="email" />
      <Input label="Password:" type="password" />

      <Button type="submit">Login</Button>
    </>
  );

  const registerForm = (
    <>
      <Input label="Email:" type="email" />
      <Input label="Repeat Email:" type="email" />
      <Input label="Password:" type="password" />
      <Input label="Repeat Password:" type="password" />

      <Button type="submit">Register</Button>
    </>
  );

  return (
    <>
      <Card>Get ready to train</Card>
      <Card>
        <div className={styles["tab-switch"]}>
          <Button accent={isLogin}>Login</Button>
          <Button accent={!isLogin}>Register</Button>
        </div>
        <form className={styles.form}>
          {isLogin ? loginForm : registerForm}
        </form>
      </Card>
    </>
  );
};

export default HomePage;
