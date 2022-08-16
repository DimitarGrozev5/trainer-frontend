import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import Button from "../../UI-elements/Button/Button";
import { useForm } from "../../../hooks/useForm/useForm";
import { V } from "../../../hooks/useForm/useForm-validators";
import { useHttpClient } from "../../../hooks/useHttpClient";
import LoadingSpinner from "../../UI-elements/LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  // Get Cttp Client
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  // Setup register state
  const [
    registerData,
    registerFormIsValid,
    onChange,
    onBlur,
    touchRegisterForm,
    resetRegisterForm,
  ] = useForm([
    { name: "email", init: "", err: "Invalid Email!", validator: V.isEmail() },
    {
      name: "re-email",
      init: "",
      err: "Emails don't match!",
      validator: V.isEqualTo("email"),
    },
    {
      name: "pass",
      init: "",
      err: "Invalid Password!",
      validator: V.longerThan(5),
    },
    {
      name: "re-pass",
      init: "",
      err: "Passwords don't match!",
      validator: V.isEqualTo("pass"),
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
  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // If in Register mode, validate all fields
    !loginMode && touchRegisterForm();

    if (!loginMode && !registerFormIsValid) {
      return;
    }

    // Send data to backend
    try {
      await sendRequest("/", {
        body: { email: loginEmail, password: loginPass },
        auth: false,
      });
    } catch (err: any) {
      console.log(err);
    }

    // Update state
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

      <Button type="submit" disabled={!registerFormIsValid}>
        Register
      </Button>
    </>
  );

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}

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
