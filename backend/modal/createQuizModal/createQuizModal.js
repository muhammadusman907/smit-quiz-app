import mongoose from "mongoose";
// import { creaQuizSchema } from "../../schema/createQuestionSchema/createQuestionSchema.js";
import { creatQuizSchema } from "../../schema/createQuizSchema/createQuestionSchema.js";

const createQuizModel = mongoose.model("createQuiz" , creatQuizSchema);
  creatQuizSchema
export { createQuizModel };
