import Quiz from "../modals/quiz.js";
import User from "../modals/user.js";
import Question from "../modals/question.js";
import createError from "../utils/createError.js";


export const getAllMyQuizzes = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const quizzes = await Quiz.find({ userId: user._id });

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};


export const getSingleQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const ques = await Question.findById(questionId);
    if (!ques) {
      return next(createError(404, "Question not found"));
    }

    res.status(200).json(ques);
  } catch (error) {
    next(error);
  }
};


export const getSingleQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const q = await Quiz.findById(quizId);
    if (!q) {
      return next(createError(404, "Quiz not found"));
    }

    res.status(200).json(q);
  } catch (error) {
    next(error);
  }
};


export const getAllQuestionsOfAQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(createError(404, "Quiz not found!"));
    }

    const questions = Promise.all(
      quiz?.questions.map(async (questionId) => {
        const ques = await Question.findById(questionId);
        return ques;
      })
    );

    const allQuestions = await questions;
    res.status(200).json(allQuestions);
  } catch (error) {
    next(error);
  }
};


export const getDashboardInfo = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return next(createError(404, "User not found!"));

    const totalQuizzesCreatedByUser = await Quiz.countDocuments({
      userId: user._id,
    });

    const totalQuestionCreatedByUser = await Quiz.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: "$questions",
        },
      },
      {
        $addFields: {
          numberOfTags: {
            $size: { $ifNull: ["$_id", []] },
          },
        },
      },
      {
        $group: {
          _id: null,
          numberOfQuestions: {
            $sum: "$numberOfTags",
          },
        },
      },
    ]);

    const totalImpressionsOfAUser = await Quiz.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: null,
          impressionSum: {
            $sum: "$impressions",
          },
        },
      },
    ]);

    res.status(200).json({
      totalQuizzesCreatedByUser,
      totalQuestionCreatedByUser: totalQuestionCreatedByUser[0]
        ?.numberOfQuestions
        ? totalQuestionCreatedByUser[0].numberOfQuestions
        : 0,
      totalImpressions: totalImpressionsOfAUser[0]?.impressionSum
        ? totalImpressionsOfAUser[0].impressionSum
        : 0,
    });
  } catch (error) {
    next(error);
  }
};
