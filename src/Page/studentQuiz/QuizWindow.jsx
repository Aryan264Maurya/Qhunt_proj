import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { getExtraQuiz } from '../../services/operations/ExtraInfo';

const QuizWindow = ({ quizName, questions, teacherName }) => {
  const [showStartButton, setShowStartButton] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [extraInfo, setExtraInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExtraInfo = async () => {
      try {
        const extraInfoData = await getExtraQuiz(quizName);
        setExtraInfo(extraInfoData[0]); // Access the first element of the array
      } catch (error) {
        console.error('Error fetching extra info:', error.message);
      }
    };

    fetchExtraInfo();
  }, [quizName]);

  const handleStartQuiz = () => {
    if (extraInfo && extraInfo.giveQuiz === 'YES') {
      setShowModal(true);
    } else {
      setStartQuiz(true);
      setShowStartButton(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const renderExtraInfo = () => {
    if (extraInfo) {
      return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quiz Details</h2>
          <p className="text-lg"><strong>Pass Marks:</strong> {extraInfo.passMarks}</p>
          <p className="text-lg"><strong>Total Marks:</strong> {extraInfo.totalMarks}</p>
          <p className="text-lg"><strong>Time Duration:</strong> {extraInfo.timeDuration} minutes</p>
          <p className="text-lg"><strong>Permission:</strong> {extraInfo.permission}</p>
        </div>
      );
    } else {
      return <p>Loading extra info...</p>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {showStartButton && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">{quizName}</h1>
          <p className="text-lg mb-6">Please review the following details before starting the quiz:</p>
          {renderExtraInfo()}
          {!startQuiz && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-medium"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          )}
        </div>
      )}
      {startQuiz && <Quiz quizName={quizName} questions={questions} teacherName={teacherName} extraInfo={extraInfo} onQuizComplete={() => {}} />}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-filter backdrop-blur-sm">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block text-richblack-900 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Permission Required</h3>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">You are required to take permission before starting the quiz.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full text-white inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizWindow;
