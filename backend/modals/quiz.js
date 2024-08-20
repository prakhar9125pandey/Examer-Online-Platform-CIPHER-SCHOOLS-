import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    quizName: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      enum: ["QA", "POLL"],
    },
    timer: {
      type: Number,
      default: 0,
    },
    optionType: {
      type: String,
      enum: ["text", "image", "textImage"],
    },
    
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "question",
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
