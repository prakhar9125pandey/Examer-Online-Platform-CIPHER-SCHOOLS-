import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      enum: ["QA", "POLL"],
    },
    optionType: {
      type: String,
      enum: ["text", "image", "textImage"],
    },
    timer: {
      type: Number,
      default: 0,
    },
    options: [
      {
        text: String,
        imageUrl: String,
      },
    ],
    correctAnswer: {
      type: Number,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    optedPollOption1: {
      type: Number,
      default: 0,
    },
    optedPollOption2: {
      type: Number,
      default: 0,
    },
    optedPollOption3: {
      type: Number,
      default: 0,
    },
    optedPollOption4: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    answedCorrectly: {
      type: Number,
      default: 0,
    },
    answerdIncorrectly: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
