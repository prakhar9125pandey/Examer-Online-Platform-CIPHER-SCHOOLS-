import express from "express";
import {
  IncreaseImpressionOnQuiz,
  TrendingQuizzes,
  createQuiz,
  deleteQuiz,
  playQuiz,
  updateQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middlewares/jwt.js";
const router = express.Router();

// create a quiz
router.post("/", protect, createQuiz);

// delete a quiz
router.delete("/:quizId", protect, deleteQuiz);

// edit a quiz
router.put("/update/:quizId", protect, updateQuiz);

// increase impression on quiz
router.put("/:quizId", IncreaseImpressionOnQuiz);

// increase impression on quiz
router.get("/trending", protect, TrendingQuizzes);

// play quiz
router.patch("/playQuiz", playQuiz);

export default router;
