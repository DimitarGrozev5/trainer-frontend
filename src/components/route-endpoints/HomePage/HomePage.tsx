import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";
import { useSState } from "../../../hooks/useSState";
import { useForm } from "../../../hooks/useForm";
import { notEmpty } from "../../../util/data-validation";

const HomePage = () => {
  const [loginMode, , { setStateTo: setLoginModeTo }] = useSState(true);

  const [registerData, onChange] = useForm([
    { name: "email", init: "", err: "Invalid Email!", validator: notEmpty },
    {
      name: "re-email",
      init: "",
      err: "Emails don't match!",
      validator: notEmpty,
    },
    { name: "pass", init: "", err: "Invalid Password!", validator: notEmpty },
    {
      name: "re-pass",
      init: "",
      err: "Passwords don't match!",
      validator: notEmpty,
    },
  ]);

  const loginForm = (
    <>
      {/* <Input label="Email:" type="email" />
      <Input label="Password:" type="password" /> */}

      <Button type="submit">Login</Button>
    </>
  );

  const registerForm = (
    <>
      <Input
        label="Email:"
        type="email"
        error="Invalid Email"
        value={registerData["email"].value}
        onChange={onChange("email")}
      />
      <Input
        label="Repeat Email:"
        type="email"
        value={registerData["re-email"].value}
        onChange={onChange("re-email")}
      />
      <Input
        label="Password:"
        type="password"
        value={registerData["pass"].value}
        onChange={onChange("pass")}
      />
      <Input
        label="Repeat Password:"
        type="password"
        value={registerData["re-pass"].value}
        onChange={onChange("re-pass")}
      />

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
