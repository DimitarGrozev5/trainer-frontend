import React, { useState } from "react";
import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";
import { useForm } from "../../../hooks/useForm";
import { notEmpty } from "../../../util/data-validation";

const HomePage = () => {
  // Setup register state
  const [registerData, onChange, onBlur, touchRegisterForm, resetRegisterForm] =
    useForm([
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

  // Setup Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Setup Tabs state for chaning between Login and Register
  const [loginMode, setLoginMode] = useState(true);
  const setLoginModeTo = (val: boolean) => () => {
    // Reset forms when swiching
    resetRegisterForm();
    setLoginEmail("");
    setLoginPass("");

    // Update state
    setLoginMode(val);
  };

  // Form submit handler
  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    loginMode && touchRegisterForm();
  };

  // Components for login form
  const loginForm = (
    <>
      <Input
        label="Email:"
        type="email"
        value={loginEmail}
        onChange={setLoginEmail}
      />
      <Input
        label="Password:"
        type="password"
        value={loginPass}
        onChange={setLoginPass}
      />

      <Button type="submit">Login</Button>
    </>
  );

  // Components for registration form
  const registerForm = (
    <>
      <Input
        label="Email:"
        type="email"
        error={registerData["email"].isValid}
        value={registerData["email"].value}
        onChange={onChange("email")}
        onBlur={onBlur("email")}
      />
      <Input
        label="Repeat Email:"
        type="email"
        error={registerData["re-email"].isValid}
        value={registerData["re-email"].value}
        onChange={onChange("re-email")}
        onBlur={onBlur("re-email")}
      />
      <Input
        label="Password:"
        type="password"
        error={registerData["pass"].isValid}
        value={registerData["pass"].value}
        onChange={onChange("pass")}
        onBlur={onBlur("pass")}
      />
      <Input
        label="Repeat Password:"
        type="password"
        error={registerData["re-pass"].isValid}
        value={registerData["re-pass"].value}
        onChange={onChange("re-pass")}
        onBlur={onBlur("re-pass")}
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
        <form className={styles.form} onSubmit={submitHandler}>
          {loginMode ? loginForm : registerForm}
        </form>
      </Card>
    </>
  );
};

export default HomePage;
