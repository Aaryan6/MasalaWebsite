import React from "react";
import styles from "../styles/Contactus.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact us</h2>
      <div className={styles.form}>
        <form action="">
          <div className={styles.inputs}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <textarea
            placeholder="Message..."
            className={styles.message}
          ></textarea>
          <button className={styles.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
