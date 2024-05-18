import mongoose from "mongoose";

const creatQuizSchema = mongoose.Schema({
  quiz_name: String,
  duration: String,
  total_marks: String,
  passing_marks: String,
});

export { creatQuizSchema };
