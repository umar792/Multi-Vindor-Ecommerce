import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const server = "http://localhost:4000";

const ActivateAccount = () => {
  const { activation_Token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_Token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activationAccount`, {
            activation_Token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
            console.log(err.message);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully! Please Login</p>
      )}
    </div>
  );
};

export default ActivateAccount;
