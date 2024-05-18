import React, { useState } from "react";
import Navbar from "../../../components/navbar/navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Form, Input, Checkbox } from "antd";
import axios from "axios";
import { useEffect } from "react";
import MyModal from "../../../components/modal/modal";
import MyInput from "../../../components/input/input";
// import { Button as Buton} from './../../../components/button/button.jsx';

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const QuestionAnswerList = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const quizId = searchParams.get("id");
  // console.log(searchParams.get("id"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizModalDetail, setQuizModalDetail] = useState({});
  const [addUpdate, setAddUpdate] = useState("");
  const [quizQuesId, setQuizQuesId] = useState("");
  const [count, setCount] = useState(0);
  const [ checkedOption , setCheckedOption ] = useState([]) ;
  // console.log(addUpdate);
  // console.log(addUpdate)
  const [form] = Form.useForm();
  // console.log("quiz Modal ----->" , quizModalDetail);
  //  ************************  Modal ********************
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getQuestionAnswer = async () => {
    try {
      const getQuesAns = await axios.get(
        `http://localhost:3000/add_get_question/get_question${quizId}`
      );
      // console.log(getQuesAns.data);
      setQuizList(getQuesAns.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addQuestionAnswer = async (values) => {
    try {
      console.log("Received values of form: ", values , checkedOption);
      form.resetFields();
      setCheckedOption("")
      const questionAnswerOption = {}
      const correctOption = checkedOption.map ((value , index) => {
        return values.names[value];
      } )
      const option = values.names.map((value, index) => {
        // console.log((questionAnswerOption[`option${index}`] = value));
           const ques =   questionAnswerOption[`question`] = values.question; 
           const answers =   questionAnswerOption[`option${index + 1}`] = value ;
           const correctAnswer = questionAnswerOption[`correctOption`] = correctOption ;
      const createQuestionAnswer = {
          ques,
          ...answers,
          correctAnswer,
        };
     return createQuestionAnswer ;       
  
      });
      console.log(questionAnswerOption);
 
      // const addQuesAns = await axios.post(
      //   `http://localhost:3000/add_get_question/add_question${quizId}`,
      //   { ...values }
      // );
      // getQuestionAnswer();
      // console.log(addQuesAns);
    } catch (error) {
      alert(error);
    }
  };
  const deleteQuestionAnswer = async (quizId) => {
    try {
      const deleteQues = await axios.delete(
        `http://localhost:3000/add_get_question/delete_question${quizId}`
      );
      console.log(deleteQues);
      getQuestionAnswer();
    } catch (error) {
      console.log(error);
    }
  };
  const editQuestionAnswer = (id) => {
    setAddUpdate("updateQuestion");
    showModal();
    // updateQuestionAnswer();
  };

  const updateQuestionAnswer = async (values) => {
    try {
      console.log("Received values of formss: ", values);
      const updateQuesAns = await axios.put(
        `http://localhost:3000/add_get_question/update_question${quizQuesId}`,
        { ...values }
      );
      console.log(updateQuesAns);
      form.resetFields();
      // navigate("/question_answer_list")
      getQuestionAnswer();
      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values , checkedOption);
  };

  const isCheckedCorrOpt = (e) => {
    setCheckedOption([ ...checkedOption , e[0]])

    // console.log(checkedOption , e[0]);
  };
  // console.log(quizModalDetail);
  useEffect(() => {
    getQuestionAnswer();
  }, []);
  return (
    <>
      <Navbar />
      <MyModal
        title={quizModalDetail?.quiz_name}
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
            onFinish={
              addUpdate === "addQuestion"
                ? addQuestionAnswer
                : updateQuestionAnswer
            }
          >
            question :
            <MyInput
              name="question"
              message="question is requred"
              placeholder="question"
              defaultValue={quizModalDetail && quizModalDetail?.question}
            />
            <div className=" container w-[50%] ">
              <Form.List
                name="names"
                initialValue={["", "", "", ""]}
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 0) {
                        return Promise.reject(
                          new Error("At least 2 passengers")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        // label={index === 0 ? "option:" : ""}
                        required={false}
                        key={field.key}
                        className="w-[100%]"
                      >
                        <Checkbox.Group onChange={isCheckedCorrOpt}>
                          <Checkbox
                            name=""
                            value={index + ""}
                          >
                            option {index}
                          </Checkbox>
                        </Checkbox.Group>

                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input option's name or delete this field.",
                            },
                          ]}
                          className="w-[100%] border-red-500"
                          noStyle
                        >
                          <Input
                            placeholder={`option${index}`}
                            style={{
                              width: "93%",
                            }}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          setCount(count + 1);
                          add();
                        }}
                        style={{
                          width: "100%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add option
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  classNames=""
                >
                  {addUpdate === "addQuestion" ? "Add New Question" : "Update "}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </MyModal>
      <div className="border-1 flex px-10  items-center font-bold mt-5">
        <p>s.no</p>
        <p className="w-[20%] text-center">Question</p>
        <p className="w-[20%] text-center"></p>
        <p className="w-[20%] text-center">Answer</p>

        <div className="flex justify-end w-[40%]">
          <Button
            type="primary"
            onClick={() => {
              setQuizModalDetail();
              showModal();
              setAddUpdate("addQuestion");
            }}
          >
            Add New Question
          </Button>
        </div>
      </div>
      {/* {console.log(quizList)} */}
      {quizList.map((value, index) => (
        <div className="border mt-2 flex items-center px-10" key={value._id}>
          <p>{index + 1}</p>

          <p className="w-[20%]  text-center break-words px-4 ">
            {value?.question}
          </p>
          <div className="w-full">
            <p className=" text-center break-words px-4">{value?.option_1}</p>
            <p className="text-center break-words px-4">{value?.option_2}</p>
            <p className="  text-center break-words px-4">{value?.option_3}</p>
            <p className="  text-center break-words px-4">{value?.option_4}</p>
          </div>

          <div className="flex gap-4 w-[20%]  text-center">
            <Button
              type="primary "
              className="rounded-full h-[40px] w-[40px] flex justify-center items-center"
              onClick={() => {
                editQuestionAnswer(value._id);
                setAddUpdate("updateQuestion");
                setQuizQuesId(value._id);
                setQuizModalDetail(value);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                deleteQuestionAnswer(value._id);
              }}
              type="primary "
              className="rounded-full h-[40px] w-[40px] flex justify-center items-center "
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionAnswerList;

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };
// const App = () => <Checkbox onChange={onChange}>Checkbox</Checkbox>;
