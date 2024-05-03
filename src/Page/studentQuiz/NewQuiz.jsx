import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DisplayQuiz } from '../../services/operations/GetQuiz';
import QuizWindow from './QuizWindow';

export default function GetMyQuiz() {
  const [quizName, setQuizName] = useState('');
  const [quizzes, setQuizzes] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleInputChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleFindQuizzes = async () => {
    try {
      console.log(`Finding quizzes with name: ${quizName}`);
      toast.success(`Finding quizzes with name: ${quizName}`);
      setLoading(true);
      
      const response = await DisplayQuiz(quizName);
      setQuizzes(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to fetch quizzes');
      setLoading(false);
    }
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setStartQuiz(true);
  };

  return (
    <div>
      {!startQuiz && (
        <>
          <label htmlFor="quizName" className='text-white'>Enter Quiz Name:</label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            value={quizName}
            onChange={handleInputChange}
            className="w-450 ml-5 mt-2 mr-24 rounded-[0.5rem] bg-richblack-700 p-[8px] pr-1 text-richblack-5"
            required
          />
          <button 
            onClick={handleFindQuizzes}
            className="mt-6 ml-10 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Find The Quiz
          </button>
          
          {quizzes && (
            <div>
              {quizzes.trueQuestions.map((quiz, index) => (
                <div key={`true-quiz-${index}`} className="flex items-center">
                  <p className='mt-20'>Quiz Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.quizName}</p>
                  <p className='mt-20 ml-10'>Teacher Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.teacherName}</p>
                  <button 
                    className="rounded-md ml-24 bg-richblack-700 mt-20 py-[8px] px-[12px] font-medium text-white"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
              {quizzes.createQuestions.map((quiz, index) => (
                <div key={`create-quiz-${index}`} className="flex items-center">
                  <p className='mt-20'>Quiz Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.quizName}</p>
                  <p className='mt-20 ml-10'>Teacher Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.teacherName}</p>
                  <button 
                    className="rounded-md ml-24 bg-richblack-700 mt-20 py-[8px] px-[12px] font-medium text-white"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
              {quizzes.multiQuestions.map((quiz, index) => (
                <div key={`multi-quiz-${index}`} className="flex items-center">
                  <p className='mt-20'>Quiz Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.quizName}</p>
                  <p className='mt-20 ml-10'>Teacher Name:</p>
                  <p className="mt-20 ml-5 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">{quiz.teacherName}</p>
                  <button 
                    className="rounded-md ml-24 bg-richblack-700 mt-20 py-[8px] px-[12px] font-medium text-white"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {startQuiz && !loading && selectedQuiz && (
        <QuizWindow
          quizName={selectedQuiz.quizName}
          questions={selectedQuiz.questions}
          teacherName={selectedQuiz.teacherName}
        />
      )}
    </div>
  );
}
