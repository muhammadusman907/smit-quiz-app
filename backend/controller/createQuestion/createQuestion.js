// import QuestionAnswer from "../../../frontend/src/pages/questionAnswer/questionAnswerAdd/questionAnswer.js";

import { CreateQuestionModel } from "../../modal/createQuestionModal/createQuestionModal.js";

const addQusetion = async (req, res) => {
  const { quizId } = req.params;

  const { question, correct_option, option_1, option_2, option_3, option_4 } =
    req.body;
  console.log(question, correct_option, options );
  // console.log(req.body.qiuzId);
  // try {
  //   const createQuestionAns = await CreateQuestionModel.create({
  //     question,
  //     correct_option,
  //     options ,
  //     quizId,
  //   });
  //   res.status(200).send({
  //     message: "question Answer Add sucessfully",
  //     createQuestionAns,
  //   });
  // } catch (error) {
  //   res.status(500).send({
  //     error,
  //     message: "Internal server error",
  //   });
  // }
};

const getQuestionAnswer = async (req, res) => {
  const { quizId } = req.params;
  try {
    const getQuesAns = await CreateQuestionModel.find({
      quizId : quizId
    });
    res.status(200).send(getQuesAns);
  } catch (error) {
    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
};
const deleteQuestionAnswer = async(req , res) =>{
  console.log(req.params)
  try {
    const deleteQuesAns = await CreateQuestionModel.deleteOne({_id : req.params.quizId })
    res.status(200).send({
      message : "delete question " ,
      deleteQuesAns
    }) 
  } catch (error) {
    res.status(200).send({
      message: "Internal server error",
      error
    }); 
  }
}
const updateQuestionAnswer = async (req, res) => {
  console.log(req.params);
  const updateValues = req.body ;
  try {
    const updateQuesAns = await CreateQuestionModel.updateOne(
      {
        _id: req.params.quizQuesId,
      },
     updateValues
    );
    res.status(200).send({
      message: "delete question ",
      updateQuesAns,
    });
  } catch (error) {
    res.status(200).send({
      message: "Internal server error",
      error,
    });
  }
};
export { addQusetion, getQuestionAnswer , deleteQuestionAnswer , updateQuestionAnswer };
//  question: String,
// correct_option: String,
// option_1: String,
// option_2: String,
// option_3: String,
// option_4: String,
