import React from "react";
import styles from "./pageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errStatus}>404</h1>
      <p className={styles.msg}>Page Not Found!</p>

      <Link to={`/`} className={styles.link}>
        <button className={styles.btn}>Go back</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
