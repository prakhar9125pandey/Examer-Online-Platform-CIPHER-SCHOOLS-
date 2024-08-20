import React, { useState } from "react";
import { Modal } from "@mantine/core";
import styles from "./createQuiz.module.css";
import { QA } from "../QA/QA";
import { Poll } from "../poll/Poll";
import toast from "react-hot-toast";

export const CreateQuiz = ({ openCreateQuizModal, setOpenCreateQuizModal }) => {
  // 0 means Q&A, 1 means Poll
  const [quizType, setQuizType] = useState(0);

  // 0 means Quiz1, 1 means QA/Poll, 2 means quizCreated
  const [showComponent, setShowComponent] = useState(0);

  const [quizName, setQuizName] = useState("");
  const [quizId, setQuizId] = useState("");

  const [err, seterr] = useState("");
  const handleContinueToQuiz1 = (e) => {
    seterr("");

    if (!quizName) {
      seterr("Quiz Name is required!");
      return;
    }
    setShowComponent(1);
  };

  return (
    <Modal
      opened={openCreateQuizModal}
      onClose={() => setOpenCreateQuizModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
    >
      {showComponent === 0 && (
        <Quiz1
          quizType={quizType}
          setQuizType={setQuizType}
          setOpenCreateQuizModal={setOpenCreateQuizModal}
          setShowComponent={setShowComponent}
          setQuizName={setQuizName}
          handleContinueToQuiz1={handleContinueToQuiz1}
          err={err}
        />
      )}

      {showComponent === 1 &&
        (quizType === 0 ? (
          <QA
            openCreateQuizModal={openCreateQuizModal}
            setOpenCreateQuizModal={setOpenCreateQuizModal}
            setShowComponent={setShowComponent}
            quizName={quizName}
            quizType="QA"
            setQuizId={setQuizId}
          />
        ) : (
          <Poll
            openCreateQuizModal={openCreateQuizModal}
            setOpenCreateQuizModal={setOpenCreateQuizModal}
            setShowComponent={setShowComponent}
            quizName={quizName}
            quizType="POLL"
            setQuizId={setQuizId}
          />
        ))}

      {showComponent === 2 && (
        <QuizCreated quizType={quizType} quizId={quizId} />
      )}
    </Modal>
  );
};

const Quiz1 = ({
  quizType,
  setQuizType,
  setOpenCreateQuizModal,
  setShowComponent,
  setQuizName,
  handleContinueToQuiz1,
  err,
}) => {
  return (
    <div className={styles.modal}>
      <input
        type="text"
        placeholder={err ? err : "Quiz Name"}
        className={styles.quizNameInput}
        onChange={(e) => setQuizName(e.target.value)}
        style={{ border: err ? "1px solid red" : "1px solid transparent" }}
      />

      <div className={styles.content}>
        <label htmlFor="quizType">Quiz Type </label>
        <button
          onClick={() => setQuizType(0)}
          className={`${styles.optionToSelect} ${
            quizType === 0 && styles.selected
          }`}
        >
          Q & A
        </button>
        <button
          onClick={() => setQuizType(1)}
          className={`${styles.optionToSelect} ${
            quizType === 1 && styles.selected
          }`}
        >
          Poll Type
        </button>
      </div>

      <div className={styles.btns}>
        <button
          onClick={() => setOpenCreateQuizModal(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button onClick={handleContinueToQuiz1} className={styles.continueBtn}>
          Continue
        </button>
      </div>
    </div>
  );
};

const QuizCreated = ({ quizType, quizId }) => {
  const shareQuiz = () => {
    navigator.clipboard.writeText(
      `https://quizzie-six.vercel.app/playquiz/${quizId}`
    );

    toast.success("Link copied to clipboard");
  };

  return (
    <div className={styles.modal}>
      <div style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600" }}>
        <p>Congrats your {quizType === 0 ? "Quiz" : "Poll"} is</p>
        <p>Published</p>
      </div>

      <input
        type="text"
        placeholder={`Your ${quizType === 0 ? "quiz" : "poll"} link is here`}
        className={styles.quizNameInput}
        readOnly
        value={`https://quizzie-six.vercel.app/playQuiz/${quizId}`}
      />

      <div className={styles.shareBtnDiv}>
        <button className={styles.shareBtn} onClick={shareQuiz}>
          Share
        </button>
      </div>
    </div>
  );
};
