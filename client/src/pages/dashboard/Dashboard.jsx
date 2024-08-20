import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { QuizzesComp } from "../../components/quizzesComp/QuizzesComp";
import newRequest from "../../utils/newRequest";
import { useSelector } from "react-redux";
import convertToK from "../../utils/convertToK";
import { LoadingSVG } from "../../assets/LoadingSvg";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get("/user/dashboard");
        setDashboardData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchD();
    }
  }, [currentUser]);

  const [loading, setLoading] = useState(false);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      try {
        setLoading(true);
        const res = await newRequest.get(`quiz/trending`);
        setTrendingQuizzes(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchD();
    }
  }, [currentUser]);

  return (
    <div
      className={styles.dashboard}
      style={{
        backgroundImage: "url('/Users/prakharpandey0711/Downloads/quizzie-main/client/src/pages/dashboard/exam.jpg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.mainContent}>
        <div className={styles.singleContent} style={{ color: "orange" }}>
          <p className={styles.heading}>
            <span>{dashboardData.totalQuizzesCreatedByUser} </span> Quiz
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "green" }}>
          <p className={styles.heading}>
            <span>{dashboardData?.totalQuestionCreatedByUser} </span>Questions
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "blue" }}>
          <p className={styles.heading}>
            <span>{convertToK(dashboardData?.totalImpressions)} </span> Total
          </p>
          <p className={styles.para}>Impressions</p>
        </div>
      </div>

      <h6 style={{ margin: "4rem 0 3rem 0", fontSize: "2rem" }}>
        Trending Quizzes
      </h6>

      <div className={styles.quizzesComp}>
        {loading ? (
          <div style={{ textAlign: "center" }}>{LoadingSVG}</div>
        ) : trendingQuizzes?.length === 0 ? (
          <div style={{ color: "#123456" }}>No trending quizzes!</div>
        ) : (
          trendingQuizzes?.map((trendingQuiz) => (
            <QuizzesComp key={trendingQuiz?._id} quizData={trendingQuiz} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
