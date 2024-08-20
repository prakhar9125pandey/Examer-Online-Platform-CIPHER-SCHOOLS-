import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import styles from "./playQuiz.module.css";
import CongratulationsImg from "../../assets/congratulations.png";
import { LoadingSVG } from "../../assets/LoadingSvg";

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState("");
  const [userScore, setUserScore] = useState(0);

  // this fetches quiz data
  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(`user/analytics/q/${quizId}`);
        setQuizData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchD();
  }, [quizId]);

  // this will update impressions data of a quiz
  useEffect(() => {
    const fetchD = async () => {
      try {
        await newRequest.put(`quiz/${quizId}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchD();
  }, [quizId]);

  // this fetches quiz questions
  const [quizQuestions, setQuizQuestions] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(
          `user/analytics/questionWise/${quizId}`
        );
        setQuizQuestions(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, [quizId]);

  const [showComp, setShowComp] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.miniContainer}>
        {showComp === 0 && (
          <>
            <h1 className={styles.quizTitle}>{quizData?.quizName}</h1>
            <button
              onClick={() => setShowComp(1)}
              className={styles.startQuizBtn}
            >
              Start Quiz
            </button>
          </>
        )}

        {showComp === 1 && (
          <StartQuiz
            setShowComp={setShowComp}
            quizData={quizData}
            quizQuestions={quizQuestions}
            setUserScore={setUserScore}
          />
        )}

        {showComp === 2 && (
          <QuizCompleted
            quizData={quizData}
            quizQuestions={quizQuestions}
            userScore={userScore}
          />
        )}
      </div>
    </div>
  );
};

const StartQuiz = ({ setShowComp, quizData, quizQuestions, setUserScore }) => {
  const totalQuestionInQuiz = quizQuestions?.length - 1;
  const [currQuestion, setCurrQuestion] = useState(0);
  const [time, setTime] = useState(quizData?.timer);

  const [answers, setAnswers] = useState({
    quizType: quizData?.quizType,
    questions: [],
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Go to next question on btn click
  const handleNextQuestion = async () => {
    setIsLoading(true);
    if (currQuestion === totalQuestionInQuiz) {
      try {
        const res = await newRequest.patch(`quiz/playQuiz`, answers);
        setUserScore(res?.data?.score);
      } catch (error) {
        console.log(error);
      }

      // console.log(answers);
      setShowComp(2);
      return;
    }
    setIsLoading(false);
    setCurrQuestion(currQuestion + 1);
    setTime(quizData?.timer);
    setSelectedOption(null);
  };

  // timer management
  useEffect(() => {
    const timerId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, currQuestion]);

  // going to next question automatically, when time ends
  useEffect(() => {
    if (quizData?.timer > 0) {
      const timerId = setTimeout(async () => {
        if (
          currQuestion === totalQuestionInQuiz &&
          quizData?.quizType === "QA"
        ) {
          try {
            const res = await newRequest.patch(`quiz/playQuiz`, answers);
            setUserScore(res?.data?.score);
          } catch (error) {
            console.log(error);
          }
          // console.log(answers);
          setShowComp(2);
          return;
        }

        if (quizData?.timer > 0) {
          setCurrQuestion(currQuestion + 1);
        }
        setTime(quizData?.timer);
      }, quizData?.timer * 1000);

      setSelectedOption(null);

      return () => clearInterval(timerId);
    }
  }, [currQuestion, quizData?.timer]);

  useEffect(() => {
    const existingItem = answers?.questions?.findIndex(
      (item) => item.questionId === quizQuestions[currQuestion]._id
    );

    if (selectedOption) {
      if (existingItem !== -1) {
        const newAnswers = { ...answers };
        answers.questions[existingItem].chosenAnswer = selectedOption;
        setAnswers(newAnswers);
      } else {
        const newAnswers = { ...answers };
        newAnswers.questions.push({
          questionId: quizQuestions[currQuestion]._id,
          chosenAnswer: selectedOption,
        });
        setAnswers(newAnswers);
      }
    }
  }, [selectedOption]);

  return (
    <div className={styles.startQuizArea}>
      <div className={styles.topArea}>
        <p style={{ fontSize: "1.4rem", fontWeight: 700 }}>
          0{currQuestion + 1}/0{totalQuestionInQuiz + 1}
        </p>
        {quizData?.timer > 0 && (
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "red" }}>
            00:{time?.toString()?.padStart(2, "0")}s
          </p>
        )}
      </div>

      <h3 className={styles.questionText}>
        {quizQuestions[currQuestion]?.question}
      </h3>

      <div className={styles.options}>
        {quizQuestions[currQuestion]?.options?.map((o, idx) => (
          <div
            className={styles.optionBox}
            key={idx}
            onClick={() => setSelectedOption(idx + 1)}
            style={{
              border: idx + 1 === selectedOption && "3px solid blue",
            }}
          >
            {quizData?.optionType === "text" && (
              <div style={{ padding: "1rem 4rem" }}>{o.text}</div>
            )}

            {quizData?.optionType === "image" && (
              <img
                src={o?.text}
                style={{
                  height: "8rem",
                  objectFit: "fill",
                  borderRadius: "8px",
                  width: "100%",
                }}
                alt=""
              />
            )}

            {quizData?.optionType === "textImage" && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  padding: "0 0.5rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "1.6rem" }}>{o.text}</p>
                <img
                  src={o.imageUrl}
                  alt=""
                  style={{
                    width: "9rem",
                    borderRadius: "8px",
                    height: "7rem",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.nextBtnDiv}>
        <button
          className={styles.nextBtn}
          onClick={handleNextQuestion}
          disabled={isLoading}
        >
          {currQuestion === totalQuestionInQuiz ? "SUBMIT" : "NEXT"}
        </button>
      </div>
    </div>
  );
};

const QuizCompleted = ({ quizData, quizQuestions, userScore }) => {
  return (
    <div className={styles.quizComplete}>
      {quizData.quizType === "QA" ? (
        <div>
          <h2
            style={{
              fontSize: "2rem",
            }}
          >
            Congrats Quiz is completed
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={CongratulationsImg} alt="congratulationsImg" />
          </div>

          <p
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Your Score is{" "}
            <span style={{ color: "green" }}>
              {userScore?.toString()?.padStart(2, "0")}/0{quizQuestions?.length}
            </span>
          </p>
        </div>
      ) : (
        <p
          style={{
            fontSize: "3.2rem",
            textAlign: "center",
            fontWeight: 600,
            color: "#222222",
            padding: "1rem",
          }}
        >
          Thank you <br /> for participating in <br /> the Poll
        </p>
      )}
    </div>
  );
};

export default PlayQuiz;
