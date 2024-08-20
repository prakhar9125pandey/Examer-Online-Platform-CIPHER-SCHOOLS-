import React, { useEffect, useState } from "react";
import styles from "./questionWiseAnalysis.module.css";
import { useSelector } from "react-redux";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import convertToK from "../../utils/convertToK";
import { LoadingSVG } from "../../assets/LoadingSvg";

const QuestionWiseAnalysis = () => {
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [quizData, setQuizData] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const { quizId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(`user/analytics/q/${quizId}`);
        setQuizData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      fetchD();
    }
  }, []);

  useEffect(() => {
    const fetchD = async () => {
      try {
        setLoading(true);
        const res = await newRequest.get(
          `user/analytics/questionWise/${quizId}`
        );
        setAllQuestionsData(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchD();
    }
  }, []);

  // console.log(allQuestionsData);
  //   console.log({ quizData });

  return (
    <div className={styles.container}>
      <div className={styles.mainHeading}>
        <h1 style={{ color: "blue" }}>
          {quizData?.quizName} - Question Analysis
        </h1>
        <div style={{ fontSize: "14px", color: "red" }}>
          <p>Created on: {formatDate(quizData?.createdAt)}</p>
          <p>Impressions: {convertToK(quizData?.impressions)}</p>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          {LoadingSVG}
        </div>
      )}

      {quizData?.quizType === "QA" ? (
        <div>
          {allQuestionsData?.map((q, idx) => (
            <div className={styles.questionArea} key={q._id}>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                Q.{idx + 1}. {q.question}
              </p>

              <div className={styles.attemptsArea}>
                <div className={styles.attempt}>
                  <strong className={styles.answer}>{q.attempts}</strong>
                  <p>People attempted the question</p>
                </div>
                <div className={styles.attempt}>
                  <strong className={styles.answer}>
                    {q?.answedCorrectly}
                  </strong>
                  <p>People answered correctly</p>
                </div>
                <div className={styles.attempt}>
                  <strong className={styles.answer}>
                    {q?.answerdIncorrectly}
                  </strong>
                  <p>People answered incorrectly</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {allQuestionsData?.map((q, idx) => (
            <div className={styles.questionArea} key={q._id}>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                Q.{idx + 1}. {q.question}
              </p>

              <div className={styles.attemptsArea}>
                {q?.options?.length >= 1 && (
                  <div className={styles.attempt}>
                    <strong className={styles.answer}>
                      {q?.optedPollOption1}
                    </strong>
                    <p>Option 1</p>
                  </div>
                )}

                {q?.options?.length >= 2 && (
                  <div className={styles.attempt}>
                    <strong className={styles.answer}>
                      {q?.optedPollOption2}
                    </strong>
                    <p>Option 2</p>
                  </div>
                )}

                {q?.options?.length >= 3 && (
                  <div className={styles.attempt}>
                    <strong className={styles.answer}>
                      {q?.optedPollOption3}
                    </strong>
                    <p>Option 3</p>
                  </div>
                )}

                {q?.options?.length >= 4 && (
                  <div className={styles.attempt}>
                    <strong className={styles.answer}>
                      {q?.optedPollOption4}
                    </strong>
                    <p>Option 4</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionWiseAnalysis;
