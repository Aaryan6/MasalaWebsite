import React from "react";
import styles from "../styles/Register.module.css";

const Login = ({ setLogin }) => {
  return (
    <div className={styles.container}>
      <span className={styles.logo}>Login</span>
      <div className={styles.form}>
        <input type="email" className={styles.input} placeholder="Email" />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
        />
        <button type="submit" className={styles.button}>
          Continue
        </button>
        <span className={styles.option}>
          Don't have an account?{" "}
          <a className={styles.a} onClick={() => setLogin(false)}>
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
