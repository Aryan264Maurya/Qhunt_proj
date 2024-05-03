import React, { useState, useEffect } from 'react';
import Question from './Question';
import QuizResult from './Result'; // Import the QuizResult component

const Quiz = ({ quizName, questions, teacherName, onQuizComplete, extraInfo }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(extraInfo ? extraInfo.timeDuration * 60 : 60 * questions.length); // Total time in seconds
  const [displayQuestionNumbers, setDisplayQuestionNumbers] = useState(false);

  useEffect(() => {
    if (timeRemaining === 0) {
      finishQuiz();
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  const marksPerQuestion = extraInfo ? extraInfo.totalMarks / questions.length : 1;

  const finishQuiz = () => {
    setQuizCompleted(true);
    onQuizComplete(score); // Include the score of the last question
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      setScore(score + marksPerQuestion); // Increment score based on marks per question if the selected option is correct
    }
    setSelectedOption(''); // Clear the selected option
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1); // Move to the previous question
    }
  };

  const handleMoveToQuestion = (index) => {
    setCurrentQuestion(index);
    setDisplayQuestionNumbers(false); // Hide question numbers after moving to a question
  };

  const renderQuestionDropdown = () => {
    return questions.map((question, index) => (
      <div
        key={index}
        className="dropdown-item"
        onClick={() => handleMoveToQuestion(index)}
      >
        Question {index + 1}
      </div>
    ));
  };

  const OptionDisplay = () => {
    if (displayQuestionNumbers) {
      return (
        <div className="absolute top-0 right-0 p-4 bg-gray-200 z-10 rounded-md shadow-md">
          <div className="flex flex-col items-end">
            {renderQuestionDropdown()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 p-4 text-gray-600">{`Time Remaining: ${Math.floor(timeRemaining / 60)}:${timeRemaining % 60 < 10 ? '0' : ''}${timeRemaining % 60}`}</div>
      {quizCompleted ? (
        <QuizResult quizName={quizName} score={score} totalQuestions={questions.length} teacherName={teacherName} extraInfo={extraInfo} />
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100 relative">
          <OptionDisplay />
          <div className="bg-richblack-800 rounded-lg shadow-lg p-8 max-w-md w-full relative z-0">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{quizName}</h1>
              <div className="dropdown">
                <button className="dropdown-btn" onClick={() => setDisplayQuestionNumbers(!displayQuestionNumbers)}>
                  Move to Question
                </button>
              </div>
            </div>
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
            />
            <div className="mt-8 flex justify-between">
              <button
                className="rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="rounded-md bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
