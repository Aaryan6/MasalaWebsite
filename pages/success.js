import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      {error ? (
        <h1>Something went wrong!</h1>
      ) : !data ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Thank you for your order</h1>
      )}
    </div>
  );
};

export default Success;
