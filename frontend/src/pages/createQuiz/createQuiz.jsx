import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import { Button, Form, Input, Modal } from "antd";
import MyInput from "../../components/input/input.jsx";
import { Link } from "react-router-dom";
// import Button from './../../components/button/button.jsx';
import axios from "axios";
import { URL } from "../../env/env.js";
import MyModal from "../../components/modal/modal.jsx";
export const CreateQuiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [addUpdate, setAddUpdate] = useState("");
  const [quizId ,  setQuizId] = useState("");
  const [quizModalDetail , setQuizModalDetail] = useState({}) ;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  // console.log(form)
  // let quizList = [] ;
  const addQuiz = async (values) => {
    console.log("Received values of form: ", values);
    const val = JSON.stringify(values);
    await axios.post(`http://localhost:3000/create_get_quiz/add_quiz`, {
      values,
    });
    setQuizList([...quizList, values]);
    form.resetFields();
  };
  // console.log(quizList);
  const getAllQuizList = async () => {
    try {
      const quizData = await axios.get(
        `http://localhost:3000/create_get_quiz/get_quiz`
      );
      const { data } = quizData;
      // console.log(data);
      setQuizList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuiz = async (quizId) => {
    try {
      const deleteQuizs = await axios.delete(
        `http://localhost:3000/create_get_quiz/delete_quiz${quizId}`
      );
      console.log(deleteQuizs);
      getAllQuizList();
    } catch (error) {
      console.log(error);
    }
  };

  const editQuiz = (id) => {
    setAddUpdate("updateQuestion");
    showModal();
  };

  const updateQuiz = async (values) => {
    console.log(quizId)
    try {

      console.log("Received values of formss: ", values);
      const updateQuizs = await axios.put(
        `http://localhost:3000/create_get_quiz/update_quiz${quizId}`,
        {...values }
      );
      console.log(updateQuizs);
      form.resetFields();
      // navigate("/question_answer_list")
      getAllQuizList();
      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuizList();
  }, []);

  return (
    <>
      <Navbar />

      {/* <div className="mt-10 container m-auto">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="flex w-[100%] flex-wrap gap-5">
            <MyInput
              name="quiz_name"
              message="quiz name is requred"
              placeholder="Quiz Name"
              classAdd="w-[45%]"
            />
            <MyInput
              name="duration"
              message="duration is requred"
              placeholder="Time Duration"
              classAdd="w-[45%]"
            />
            <MyInput
              name="total_marks"
              message="Total Marks is required"
              placeholder="Total Marks"
              classAdd="w-[45%]"
            />
            <MyInput
              name="passing_marks"
              message="passing marks is requred"
              placeholder="Passing Marks"
              classAdd="w-[45%]"
            />
          </div>
          <div className=" container w-[50%] ">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                classNames=""
              >
                Add Quiz
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div> */}

      <MyModal
        title={quizModalDetail.quiz_name}
        is_modal_open={isModalOpen}
        show_modal={showModal}
        handle_ok={handleOk}
        handle_cancel={handleCancel}
      >
        <div className="mt-10 container m-auto">
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={addUpdate === "updateQuiz" ? updateQuiz : addQuiz}
          >
            <div className="flex w-[100%] flex-wrap gap-5">
              <MyInput
                name="quiz_name"
                message="quiz name is requred"
                placeholder="Quiz Name"
                classAdd="w-[45%]"
                defaultValue={quizModalDetail && quizModalDetail?.quiz_name}
              />
              <MyInput
                name="duration"
                message="duration is requred"
                placeholder="Time Duration"
                classAdd="w-[45%]"
                defaultValue={quizModalDetail && quizModalDetail?.duration}
              />
              <MyInput
                name="total_marks"
                message="Total Marks is required"
                placeholder="Total Marks"
                classAdd="w-[45%]"
                defaultValue={quizModalDetail && quizModalDetail?.total_marks}
              />
              <MyInput
                name="passing_marks"
                message="passing marks is requred"
                placeholder="Passing Marks"
                classAdd="w-[45%]"
                defaultValue={quizModalDetail && quizModalDetail?.passing_marks}
              />
            </div>
            <div className=" container w-[50%] ">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  classNames=""
                >
                  {addUpdate === "updateQuiz" ? "update" : "Add Quiz"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </MyModal>

      {/*/********************  list quiq  */}
      <div className="border-1  flex px-10  items-center font-bold">
        <p>s.no</p>
        <p className="w-[20%] text-center">name </p>
        <p className="w-[20%] text-center">duration</p>
        <p className="w-[20%] text-center">total Marks</p>
        <p className="w-[20%] text-center">Passing Marks</p>
        <Button
          type="primary mt-2"
          onClick={() => {
            setAddUpdate("addQuiz");
            showModal();
          }}
        >
          Add quiz
        </Button>
        {/* <p className="w-[20%] text-center">Edit quiz</p> */}
      </div>
      {quizList.map((value, index) => (
        <div className="border mt-2 flex items-center px-10" key={index}>
          <p>{index + 1}</p>
          {/* {console.log(value._id)} */}
          <p className="w-[20%]  text-center break-words px-4 text-primary">
            <Link to={`/question_answer_list?id=${value._id}`}>
              {" "}
              {value?.quiz_name}{" "}
            </Link>
          </p>

          <p className="w-[20%]  text-center break-words px-4">
            {value?.duration}
          </p>
          <p className="w-[20%]  text-center break-words px-4">
            {value.total_marks}
          </p>
          <p className="w-[20%]  text-center break-words px-4">
            {value.passing_marks}
          </p>
          <div className="flex gap-4 w-[20%]  text-center">
            <Button
              onClick={() => {
                editQuiz(value._id);
                setAddUpdate("updateQuiz");
                setQuizId(value._id);
                setQuizModalDetail(value);
              }}
              type="primary "
              className="rounded-full h-[40px] w-[40px] flex justify-center
            items-center"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                deleteQuiz(value._id);
              }}
              type="primary "
              className="rounded-full h-[40px] w-[40px] flex justify-center
            items-center "
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};
export default CreateQuiz;
