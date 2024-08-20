import express from "express";
const router = express.Router();
import { protect } from "../middlewares/jwt.js";
import {
  getAllMyQuizzes,
  getAllQuestionsOfAQuiz,
  getDashboardInfo,
  getSingleQuestion,
  getSingleQuiz,
} from "../controllers/userControllers.js";

router.get("/analytics", protect, getAllMyQuizzes);


router.get("/analytics/:questionId", protect, getSingleQuestion);


router.get("/analytics/q/:quizId", getSingleQuiz);


router.get("/analytics/questionWise/:quizId", getAllQuestionsOfAQuiz);


router.get("/dashboard", protect, getDashboardInfo);

export default router;
