import express from "express";
import { createQuiz , deleteQuiz, getQuiz, updateQuiz } from "../../controller/createQuiz/createquiz.js";
const createQuizRouter = express.Router();

createQuizRouter.post("/add_quiz", createQuiz);
createQuizRouter.get("/get_quiz", getQuiz);
createQuizRouter.delete("/delete_quiz:quizId", deleteQuiz);
createQuizRouter.put("/update_quiz:quizId", updateQuiz);
export { createQuizRouter };
