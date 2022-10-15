import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = ({ setLogin, closeModal }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const newUser = await axios.post("/api/userLogin", {
        email: email,
        password: password,
      });
      if (newUser.data.success) {
        toast.success("Successfully logged in!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("masaala_user", newUser.data.user_token);
        closeModal();
        router.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className={styles.container}>
      <span className={styles.logo}>Login</span>
      <div className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password (at least 6 character)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} onClick={handleLogin}>
          Continue
        </button>
        <span className={styles.option}>
          Don&apos;t have an account?{" "}
          <a className={styles.a} onClick={() => setLogin(false)}>
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
