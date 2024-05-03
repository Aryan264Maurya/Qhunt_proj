import React, { useState } from 'react';
// import './CreateQuestion.css'; // Import CSS file for styling
import CreateQuestion from "./CreateQuestion.jsx"
import MultiCorrectQuiz from "./MultiQuestion.jsx"
import TrueQuestion from "./TrueQuestion.jsx";
// Define components for different quiz types
// const SingleCorrectQuiz = () => <div>Single Correct Quiz Component</div>;
// const MultiCorrectQuiz = () => <div>Multi-correct Quiz Component</div>;
// const TrueFalseQuiz = () => <div>True/False Quiz Component</div>;
// const LongAnswerQuiz = () => <div>Long Answer Quiz Component</div>;

export default function CreateQuestionType() {
  const [selectedQuizType, setSelectedQuizType] = useState('');

  const handleQuizTypeSelect = (quizType) => {
    setSelectedQuizType(quizType);
  };

  return (
    <div className="container flex space-between flex-col ">
      <h2 className='text-white'>Select the type of quiz:</h2>
      <div className="quiz-type-buttons text-white w-full">
        <button 
        type="submit"
        className="mt-6 mr-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        onClick={() => handleQuizTypeSelect('single')}>Single Correct</button>
        <button
        type="submit"
        className="mt-6 mr-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        onClick={() => handleQuizTypeSelect('multi')}>Multi-correct</button>
        <button 
        type="submit"
        className="mt-6 mr-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        onClick={() => handleQuizTypeSelect('trueFalse')}>True/False</button>
        <button 
        type="submit"
        className="mt-6 mr-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        onClick={() => handleQuizTypeSelect('longAnswer')}>Long Answer</button>
      </div>

      {/* Render component based on selected option */}
      {selectedQuizType === 'single' && <CreateQuestion />}
      {selectedQuizType === 'multi' && <MultiCorrectQuiz />}
      {selectedQuizType === 'trueFalse' && <TrueQuestion />}
      {/* {selectedQuizType === 'longAnswer' && <LongAnswerQuiz />} */}
    </div>
  );
}
