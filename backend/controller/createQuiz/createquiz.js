import express from "express";
import { createQuizModel } from "../../modal/createQuizModal/createQuizModal.js";

const createQuiz = async (req, res) => {
  const { quiz_name, duration, passing_marks, total_marks } = req.body.values;
  console.log(req.body)
  try {
    const addQuiz = {
      quiz_name,
      duration,
      passing_marks,
      total_marks,
    };
    console.log(req.body);
    const addUser = await createQuizModel.create({
        ...addQuiz
    });
    return res.status(200).send({ message: "creat Quiz", addQuiz, addUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getQuiz = async (req, res) => {
  try {
    const getAllQuiz = await createQuizModel.find();
    // console.log(getAllQuiz);
    return res.status(200).send(getAllQuiz);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteQuiz = async (req, res) => {
  console.log(req.params);
  try {
    const delete_quiz = await createQuizModel.deleteOne({
      _id: req.params.quizId,
    });
    res.status(200).send({
      message: "delete question ",
      delete_quiz,
    });
  } catch (error) {
    res.status(200).send({
      message: "Internal server error",
      error,
    });
  }
};
const updateQuiz = async (req, res) => {
  console.log(req.params.quizId);
  const updateValues = req.body;
  console.log("update value" , updateValues);
  try {
    const updateQuizs = await createQuizModel.updateOne(
      {
        _id: req.params.quizId,
      },
        updateValues
    );
    res.status(200).send({
      message: "update question",
      updateQuizs,
    });
  } catch (error) {
    res.status(200).send({
      message: "Internal server error",
      error,
    });
  }
};

export { createQuiz, getQuiz , deleteQuiz , updateQuiz };
