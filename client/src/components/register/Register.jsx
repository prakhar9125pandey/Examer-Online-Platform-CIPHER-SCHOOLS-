import React, { useState } from "react";
import styles from "./register.module.css";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";
import { LoadingSVG } from "../../assets/LoadingSvg";

export const Register = ({ setActiveAuthComp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    const error = {};
    setError(error);

    if (!username) {
      error.nameErr = "Username is required!";
    }

    if (!email) {
      error.emailErr = "Email is required!";
    }

    if (!password) {
      error.passwordErr = "Password is required!";
    }

    if (!confirmPassword) {
      error.confirmPasswordErr = "Confirm Password is required!";
      return;
    }

    if (password !== confirmPassword) {
      error.confirmPasswordErr = "Password and Confirm Password are not same!";
      return;
    }

    try {
      setLoading(true);
      const res = await newRequest.post("auth/register", {
        username,
        email,
        password,
      });

      // console.log(res.data);
      toast.success(res.data.message);
      setActiveAuthComp(1);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setErrorResponse(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // console.log(error);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={registerUser}>
        <div className={styles.form_input}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder={error.nameErr ? error.nameErr : "username"}
            name="username"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setUsername(e.target.value)}
            style={{ border: error.nameErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.nameErr}</p>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder={error.emailErr ? error.emailErr : "email"}
            name="email"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: error.emailErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.emailErr}</p>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder={error.passwordErr ? error.passwordErr : "password"}
            name="password"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: error.passwordErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.passwordErr}</p>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="confirm_password" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            placeholder={
              error.confirmPasswordErr
                ? error.confirmPasswordErr
                : "confirm password"
            }
            name="confirm_password"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ border: error.confirmPasswordErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.confirmPasswordErr}</p>
        </div>

        <div style={{ textAlign: "center", fontSize: "14px", color: "red" }}>
          {errorResponse}
        </div>

        <div className={styles.registerBtnDiv}>
          <button disabled={loading} type="submit" className={styles.btn}>
            {loading ? <>{LoadingSVG}</> : "Sign-Up"}
          </button>
        </div>
      </form>
    </div>
  );
};
