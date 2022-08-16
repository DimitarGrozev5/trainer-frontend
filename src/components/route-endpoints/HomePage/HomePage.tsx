import React, { useState } from "react";
import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";
import { useForm } from "../../../hooks/useForm";
import { notEmpty } from "../../../util/data-validation";

const HomePage = () => {
  const [registerData, onChange, onBlur, touchForm, resetForm] = useForm([
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

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    touchForm();
  };

  const [loginMode, setLoginMode] = useState(true);
  const setLoginModeTo = (val: boolean) => () => {
    resetForm();
    setLoginMode(val);
  };

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
