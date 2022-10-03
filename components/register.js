import React from "react";
import styles from "../styles/Register.module.css";

const Register = ({ setLogin }) => {
  return (
    <div className={styles.container}>
      <span className={styles.logo}>Madhav Masaala</span>
      <div className={styles.form}>
        <input type="text" className={styles.input} placeholder="Username" />
        <input type="email" className={styles.input} placeholder="Email" />
        <input
          type="number"
          className={styles.input}
          placeholder="Mobile No."
        />

        <input
          type="password"
          className={styles.input}
          placeholder="Password (at least 6 character)"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Confirm Password"
        />
        <button type="submit" className={styles.button}>
          Create Account
        </button>
        <span className={styles.option}>
          Already have an account?{" "}
          <a className={styles.a} onClick={() => setLogin(true)}>
            Sign in
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;
