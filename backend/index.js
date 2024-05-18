import express from "express";
import "dotenv/config";
import { mongoose } from "./db/dbConnection.js";
import { createQuizRouter } from "./router/createQuiz/createQuiz.js";
import { createQuestionRouter } from "./router/cerateQuestion/createQuestion.js";
import cors from "cors";
const PORT = process.env.PORT;
console.log(PORT);
const app = express();
app.use(cors());
try {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("error", (err) => {
    console.log(" mongoodb Connection error:", err);
  });
} catch (err) {
  console.log("Error:", err);
}
app.use(express.json());
app.use("/create_get_quiz", createQuizRouter);
app.use("/add_get_question" , createQuestionRouter);



app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.listen(PORT, () => {
  console.log("server is running");
});
