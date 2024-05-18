import Navbar from "../../../components/navbar/navbar";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/button/button";
import { Radio } from "antd";
const QuestionAnswerStart = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quesIndex, setQuesIndex] = useState(0);
  const quizId = searchParams.get("quizId");
  console.log(searchParams.get("quizId"));
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  try {
    const getQuestionAnswer = async () => {
      const getQuesAns = await axios.get(
        `http://localhost:3000/add_get_question/get_question${quizId}`
      );
      console.log(getQuesAns.data);
      setQuizList(getQuesAns.data);
    };
    useEffect(() => {
      getQuestionAnswer();
    }, []);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <Navbar />
      {
        <div className="container m-auto">
          <p className="border border-primary p-3 mt-5">
            {" "}
            Q : {quizList[quesIndex]?.question}
          </p>
          <div className=" mt-16 w-full border">
            <Radio.Group
              onChange={onChange}
              value={value}
              className="w-full flex flex-col "
            >
              <Radio value={1} className="w-full border-primary">
                <p className="p-3 mt-3 w-full">
                  A :A{quizList[quesIndex]?.option_1}
                </p>
              </Radio>
              <Radio value={2} className="w-full ">
                <p className="p-3 mt-3 w-full">
                  A :B{quizList[quesIndex]?.option_2}
                </p>
              </Radio>
              <Radio value={3} className="w-full border-primary">
                <p className="p-3 mt-3 w-full">
                  A :C{quizList[quesIndex]?.option_3}
                </p>
              </Radio>
              <Radio value={4} className="w-full border-primary">
                <p className="p-3 mt-3 w-full">
                  A :D {quizList[quesIndex]?.option_4}
                </p>
              </Radio>
            </Radio.Group>
          </div>
          <Button
            btnName="Next"
            classAdd="mt-3"
            onClick={() => {
              quesIndex < quizList.length - 1 && setQuesIndex(quesIndex + 1);
              console.log(quizList.length > quesIndex);
            }}
          />
        </div>
      }
    </>
  );
};

export default QuestionAnswerStart;

// import React, { useState } from "react";

// const App = () => {
//   return (
//     <Radio.Group onChange={onChange} value={value}>
//       <Radio value={1}>A</Radio>
//       <Radio value={2}>B</Radio>
//       <Radio value={3}>C</Radio>
//       <Radio value={4}>D</Radio>
//     </Radio.Group>
//   );
// };
// export default App;
