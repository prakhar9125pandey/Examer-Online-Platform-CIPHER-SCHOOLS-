import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreateQuiz } from "../createQuiz/CreateQuiz";
import { logout } from "../../redux/userSlice";
import newRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const res = await newRequest.get(`auth/logout`);
      dispatch(logout());
      toast.success(res?.data?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>EXAMER</h1>

      <div className={styles.content}>
        <Link to={`/dashboard`} className={styles.link}>
          <h5
            className={`${styles.contentTitle} ${
              pathname === "/dashboard" && styles.selected
            }`}
          >
            Dashboard
          </h5>
        </Link>
        <Link to={`/dashboard/analytics`} className={styles.link}>
          <h5
            className={`${styles.contentTitle} ${
              (pathname === "/dashboard/analytics" ||
                pathname.split("/")[3] === "questionWise") &&
              styles.selected
            }`}
          >
            Analytics
          </h5>
        </Link>
        <h5
          className={styles.contentTitle}
          onClick={() => setOpenCreateQuizModal(true)}
        >
          Create Quiz
        </h5>
        {openCreateQuizModal && (
          <CreateQuiz
            openCreateQuizModal={openCreateQuizModal}
            setOpenCreateQuizModal={setOpenCreateQuizModal}
          />
        )}
      </div>

      <button onClick={logoutUser} className={styles.logout}>
        LOGOUT
      </button>
    </div>
  );
};
