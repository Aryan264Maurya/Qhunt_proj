import React, { useState, useEffect } from 'react';
import { getEveryExtraInfo } from './../../services/operations/ExtraInfo';
import { BsFillLockFill } from 'react-icons/bs'; // Import the lock icon

const AvailableQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getEveryExtraInfo();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };

    fetchQuizzes();
  }, []);

  const handleClick = (index) => {
  };

  const handleTakeQuiz = (quizName) => {
    console.log(`Practice clicked for quiz: ${quizName}`);
  };

  return (
    <div className="flex flex-col mt-8 space-y-8 text-white">
      <h2 className="text-2xl font-semibold mb-4">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <div 
            key={index} 
            className="relative bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 transition-transform hover:shadow-lg hover:bg-gray-200 cursor-pointer transform hover:scale-105"
            style={{ transitionDuration: '0.3s' }}
            onClick={() => handleClick(index)}
          >
            {quiz.giveQuiz === 'NO' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 rounded-lg">
                <BsFillLockFill className="text-red-500" />
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Teacher: {quiz.teacherName}</h3>
            <p className="text-gray-600">About: {quiz.about}</p>
            <p className="text-gray-600">Pass Marks: {quiz.passMarks}</p>
            <p className="text-gray-600">Total Marks: {quiz.totalMarks}</p>
            <p className="text-gray-600">Time Duration: {quiz.timeDuration}</p>
           
            {quiz.giveQuiz === 'YES' && (
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" 
                onClick={() => handleTakeQuiz(quiz.quizName)} // Pass quizName to handleTakeQuiz
              >
                Practice
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableQuiz;
