import { createQuestionSchema } from "../../schema/createQuestionSchema/createQuestionSchema.js";
import { mongoose } from "mongoose";

const CreateQuestionModel = mongoose.model(
  "createQuestionAnswer",
  createQuestionSchema
);

export { CreateQuestionModel };
