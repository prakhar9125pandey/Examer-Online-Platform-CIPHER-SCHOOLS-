import React from "react";
import styles from "./deleteQuizModal.module.css";
import { Modal } from "@mantine/core";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";

export const DeleteQuizModal = ({
  openDeleteQuizModal,
  setOpenDeleteQuizModal,
  quId,
}) => {
  const handleDeleteQuiz = async () => {
    try {
      const res = await newRequest.delete(`quiz/${quId}`);
      toast.success(res?.data?.message);
      setOpenDeleteQuizModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      opened={openDeleteQuizModal}
      onClose={() => setOpenDeleteQuizModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
      padding={"1.5rem"}
    >
      <div>
        <p className={styles.heading}>
          Are you confirm you <br />
          want to delete?
        </p>

        <div className={styles.btns}>
          <button
            type="button"
            onClick={handleDeleteQuiz}
            className={styles.cancelBtn}
          >
            Confirm Delete
          </button>
          <button
            onClick={() => setOpenDeleteQuizModal(false)}
            className={styles.continueBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
