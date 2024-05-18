import React from 'react'
import { Routes , Route} from 'react-router-dom' ;
import Home from '../pages/home/home';
import QuizStart from '../pages/quizStart/quizStart';
import CreateQuiz from '../pages/createQuiz/createQuiz';
import QuestionAnswer from './../pages/questionAnswer/questionAnswerAdd/questionAnswer';
import QuestionAnswerList from './../pages/questionAnswer/questionAnswerList/questionAnswerList';
import axios from 'axios';
import QuestionAnswerStart from '../pages/quizStart/questionAnswerStart.jsx/questionAnswerStart';

const AppRouter = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz_start" element={<QuizStart />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route
        path="/question_answer_list/question_answer"
        element={<QuestionAnswer />}
      />
      <Route path="/question_answer_list" element={<QuestionAnswerList />} />
      <Route path="/question_answer_start" element={<QuestionAnswerStart/>} />
    </Routes>
  );
}

export default AppRouter ;