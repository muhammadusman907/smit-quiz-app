import React from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import Button from "../../components/button/button.jsx";
import { useNavigate } from "react-router-dom";
const Home = () => {
   const navigate = useNavigate() ;
  return (
    <>
   
      <Navbar />
      <div className="flex justify-center items-center flex-col gap-5">
        <p className="text-primary text-[5rem] text-shadow font-semibold">
          Quiz Application
        </p>
        <p className="text-[4rem] text-shadow">
          Saylani Mass IT Training Program
        </p>
        <div className="relative w-[100%] flex justify-center">
          <p
            className=" absolute font-bold text-[1.5rem] flex justify-center 
             text-shadow"
          >
            Login
          </p>
        </div>
        <div className="flex flex-col w-[30%] gap-2 box-shadow p-16">
          {/* <p className="text-center font-semibold text-shadow">Create Quiz</p>
          <Button btnName="Admin Login" /> */}
          <p className="text-center font-semibold text-shadow" >
            Start Your Exam
          </p>
          <Button btnName="Student Login" onClick={() => navigate("/quiz_start")} />
          <Button btnName="Admin"  onClick={() => navigate("/create-quiz")}  />
        </div>
      </div>
    </>
  );
};
export default Home;
