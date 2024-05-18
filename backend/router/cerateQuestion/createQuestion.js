import express from "express";
import { addQusetion, deleteQuestionAnswer, getQuestionAnswer, updateQuestionAnswer } from "../../controller/createQuestion/createQuestion.js";

const createQuestionRouter = express.Router();

createQuestionRouter.post("/add_question:quizId", addQusetion);
createQuestionRouter.get("/get_question:quizId" , getQuestionAnswer);
createQuestionRouter.delete("/delete_question:quizId" , deleteQuestionAnswer)
createQuestionRouter.put("/update_question:quizQuesId", updateQuestionAnswer);

// createQuizrouter.get("/get_question" , getQuiz) 
export { createQuestionRouter };
