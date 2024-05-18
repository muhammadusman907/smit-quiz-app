import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";

import axios from "axios";
import MyModal from "../../components/modal/modal.jsx";
import { useNavigate } from "react-router-dom";
const QuizStart = () => {
  const [quizDataList, setquizDataList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizModalDetail, setQuizModalDetail] = useState({});
  const navigate = useNavigate();
  // console.log("quiz Modal ----->" , quizModalDetail);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    navigate(`/question_answer_start?quizId=${quizModalDetail._id}`);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getQuizData = async () => {
    try {
      const quizData = await axios.get(
        `http://localhost:3000/create_get_quiz/get_quiz`
      );
      setquizDataList(quizData.data);
      // console.log(quizData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuizData();
  }, []);
  return (
    <>
      <Navbar />

      <MyModal
        title={quizModalDetail && quizModalDetail.quiz_name}
        is_modal_open={isModalOpen}
        show_modal={showModal}
        handle_ok={handleOk}
        handle_cancel={handleCancel}
      >
        {/* {console.log(quizModalDetail?.passing_marks)} */}
        <div>
          <p>
            Passing Marks: {quizModalDetail && quizModalDetail?.passing_marks}
          </p>
          <p>Total Marks: {quizModalDetail && quizModalDetail?.total_marks}</p>
          <p>Duration: {quizModalDetail && quizModalDetail?.duration}mints</p>
        </div>
      </MyModal>
      <div className="flex justify-around mt-[30px] flex-wrap">
        {quizDataList.map((value, index) => (
          <div
            className="font-bold flex items-center justify-center box-shadow w-[30%] h-[100px] rounded-md cursor-pointer"
            onClick={() => {
              setQuizModalDetail(value);
              showModal();
            }}
            key={value._id}
          >
            <p className=" text-[2rem] text-shadow">{value.quiz_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default QuizStart;
