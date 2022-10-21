import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Contactus.module.css";

const Contact = () => {
  const user = useSelector((state) => state.order.user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, []);
  const sendMessage = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/message`,
        {
          name: name,
          email: email,
          message: message,
          userId: user?._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact us</h2>
      <div className={styles.form}>
        <form action="">
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Message..."
            className={styles.message}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className={styles.button} type="button" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
