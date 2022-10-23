import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Success.module.css";

const Success = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Thank for your order</h1>
        <Link href="/history">
          <button>Your Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
