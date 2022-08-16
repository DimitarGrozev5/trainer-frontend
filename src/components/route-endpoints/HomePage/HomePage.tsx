import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";
import { useSState } from "../../../hooks/useSState";

const HomePage = () => {
  const [loginMode, , { setStateTo: setLoginModeTo }] = useSState(true);

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
          <Button accent={!!loginMode} onClick={setLoginModeTo(true)}>
            Login
          </Button>
          <Button accent={!loginMode} onClick={setLoginModeTo(false)}>
            Register
          </Button>
        </div>
        <form className={styles.form}>
          {loginMode ? loginForm : registerForm}
        </form>
      </Card>
    </>
  );
};

export default HomePage;
