import React, { useEffect, useState } from 'react';
import { storeResult } from '../../services/operations/Result';
import { useSelector } from 'react-redux';

const QuizResult = ({ score, totalQuestions, teacherName, quizName, extraInfo }) => {
  const { user } = useSelector((state) => state.profile);
  const [passed, setPassed] = useState(false);
  const [showResult, setShowResult] = useState(true); // State to control showing result

  useEffect(() => {
    if (extraInfo && score >= extraInfo.passMarks) {
      setPassed(true);
    } else {
      setPassed(false);
    }
  }, [score, extraInfo]);

  useEffect(() => {
    // Update showResult based on permission value in extraInfo
    if (extraInfo && extraInfo.permission === 'NO') {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [extraInfo]);

  const name = user ? `${user.firstName} ${user.lastName}` : '';

  const handleStoreResult = async () => {
    try {
      const resultData = {
        points: extraInfo.totalMarks,
        achived: score,
        totalQuestions: totalQuestions,
        quizname: quizName,
        teacherName: teacherName,
        username: name,
        passed: passed ? 'yes' : 'no',
        showResult: extraInfo.permission === 'NO' ? 'YES' : 'NO', // Set showResult based on permission
      };

      const response = await storeResult(resultData);
      console.log('Result stored successfully:', response);
    } catch (error) {
      console.error('Error storing result:', error);
    }
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Result</h1>
      {showResult && (
        <>
          <p className="text-xl mb-4">Your score: {score} / {extraInfo.totalMarks}</p>
          <p className="text-xl mb-4">Pass Status: {passed ? 'Passed' : 'Failed'}</p>
        </>
      )}
      <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" onClick={handleStoreResult}>
        Thank You
      </button>
    </div>
  );
};

export default QuizResult;
