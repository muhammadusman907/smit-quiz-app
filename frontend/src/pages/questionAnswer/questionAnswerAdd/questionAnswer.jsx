import React from "react";
import Navbar from "../../../components/navbar/navbar.jsx";
import { Button, Form, Input } from "antd";
import MyInput from "../../../components/input/input.jsx";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export const QuestionAnswer = () => {
  const navigate =  useNavigate() ;
    const [searchParams, setSearchParams] = useSearchParams();
    const quizId = searchParams.get("id");
    console.log(searchParams.get("id")); 
  
    const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      form.resetFields();
      const addQuesAns = await axios.post(
        `http://localhost:3000/add_get_question/add_question${quizId}`,
        { ...values }
      );
      // navigate("/question_answer_list")
      console.log(addQuesAns);
    } catch (error) {
      alert(error);
      
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-10 container m-auto">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {/* <MyInput
            name="quiz_name"
            message="quiz name is requred"
            placeholder="Quiz Name"
          /> */}
          <MyInput
            name="question"
            message="question is requred"
            placeholder="question"
          />
          <div className=" container w-[50%] ">
            <MyInput
              name="correct_option"
              message="correct option 1 is requred"
              placeholder="Correct Option"
            />{" "}
            <MyInput
              name="option_1"
              message="option 1 is requred"
              placeholder="option 1"
            />{" "}
            <MyInput
              name="option_2"
              message="option 2 is requred"
              placeholder="option 2"
            />{" "}
            <MyInput
              name="option_3"
              message="option 3 is requred"
              placeholder="option 3"
            />{" "}
            <MyInput
              name="option_4"
              message="option 4 is requred"
              placeholder="option 4"
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                classNames=""
              >
                Add Question
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};
export default QuestionAnswer;














