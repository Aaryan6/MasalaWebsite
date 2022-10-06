import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Register.module.css";

const Register = ({ setLogin, closeModal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const handleRegister = async () => {
    try {
      const newUser = await axios.post("/api/userRegister", {
        name: name,
        email: email,
        number: number,
        password: password,
      });
      console.log(newUser.data);
      if (newUser.data.success) {
        toast.success("Successfully registered!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        closeModal();
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
      <span className={styles.logo}>Madhav Masaala</span>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Mobile No."
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
        <input
          type="password"
          className={styles.input}
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          className={styles.button}
          onClick={handleRegister}
        >
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
