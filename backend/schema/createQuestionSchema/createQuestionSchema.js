import mongoose from "mongoose";

const createQuestionSchema = mongoose.Schema({
  question: String,
  correct_option: [],
  option : {},
  quizId : String ,
});

export { createQuestionSchema};
//  option_1: String,
//   option_2: String,
//   option_3: String,
//   option_4: String,