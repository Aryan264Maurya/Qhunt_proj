import React, { useState, useEffect } from 'react';
import { DeleteQuiz } from '../../services/operations/CreateQuestions';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from "react-icons/ri";
import { getExtraQuiz, updateExtraQuiz } from "../../services/operations/ExtraInfo";

const DisplayQuizzes = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null);
  const [editingInfo, setEditingInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExtraInfo = async () => {
      try {
        if (selectedQuestion) {
          const data = await getExtraQuiz(selectedQuestion.quizName);
          setExtraInfo(data[0]);
          setEditingInfo({ ...data[0] });
        }
      } catch (error) {
        console.error('Error fetching extra info:', error);
      }
    };

    fetchExtraInfo();
  }, [selectedQuestion]);

  const handleShowQuestions = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedQuestion(null);
    setExtraInfo(null);
  };

  const handleShowQuiz = async (quiz) => {
    if (selectedQuestion === quiz) {
      setSelectedQuestion(null);
      setExtraInfo(null); // Reset extraInfo when hiding quiz
    } else {
      setSelectedQuestion(quiz);
      try {
        const data = await getExtraQuiz(quiz.quizName);
        setExtraInfo(data[0]);
        setEditingInfo({ ...data[0] });
      } catch (error) {
        console.error('Error fetching extra info:', error);
      }
    }
  };

  const handleDeleteQuiz = async (quizName) => {
    try {
      await DeleteQuiz(quizName);
      setDeleteConfirmation(null);
      window.location.reload();
    } catch (error) {
      toast.error('Error deleting quiz: ' + error.message);
    }
  };

  const handleConfirmDelete = (quizName) => {
    setDeleteConfirmation(quizName);
  };

  const handleEditInfo = (field, value) => {
    setEditingInfo({ ...editingInfo, [field]: value });
  };

  const handleSaveInfo = async () => {
    try {
      console.log("info-->")
      console.log(editingInfo);
      await updateExtraQuiz(editingInfo);
      setExtraInfo({ ...editingInfo });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating extra quiz info:', error);
    }
  };

  return (
    <div className='text-white mt-10 mx-auto max-w-2xl'>
      <h2 className="mt-6 text-center text-xl font-bold text-gray-800">Fetched Quizzes</h2>

      <div className="flex justify-center mt-6 space-x-4">
        {quizzes.createQuestions.length > 0 && (
          <button onClick={() => handleShowQuestions(quizzes.createQuestions)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Show Create Questions</button>
        )}
        {quizzes.multiQuestions.length > 0 && (
          <button onClick={() => handleShowQuestions(quizzes.multiQuestions)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Show Multi Questions</button>
        )}
        {quizzes.trueQuestions.length > 0 && (
          <button onClick={() => handleShowQuestions(quizzes.trueQuestions)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Show True Questions</button>
        )}
      </div>

      {selectedQuiz && (
        <div className="mt-8">
          <ul>
            {selectedQuiz.map((quiz, index) => (
              <li key={index} className="border-b border-gray-300 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-800">Quiz Code: {quiz.quizName}</div>
                  <div>
                    <button onClick={() => handleShowQuiz(quiz)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"> {selectedQuestion === quiz ? 'Hide Quiz' : 'Show Quiz'}</button>
                    <button onClick={() => handleConfirmDelete(quiz.quizName)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"><RiDeleteBin6Line /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedQuestion && (
        <div className="mt-8">
          <div className="text-lg font-bold text-gray-800">Quiz Code: {selectedQuestion.quizName}</div>
          <div className="mt-4">
            <h4 className="font-bold">Questions:</h4>
            <ul className="list-disc list-inside">
              {selectedQuestion.questions.map((question, idx) => (
                <li key={idx} className="text-gray-700">{idx + 1}: {question.question}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {extraInfo && (
        <div className="mt-8">
          <h2 className="text-center text-lg font-bold text-gray-800">Extra Quiz Info</h2>
          <ul className="mt-4">
            <li><span className="font-bold">Quiz Name:</span> {extraInfo.quizName}</li>
            <li><span className="font-bold">Result:</span> {extraInfo.permission}</li>
            <li><span className="font-bold">Give Quiz:</span> {extraInfo.giveQuiz}</li>
          </ul>
          <button onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Edit Info</button>
        </div>
      )}

{deleteConfirmation && (
  <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black bg-opacity-50 text-richblack-900">
    <div className="bg-white p-8 max-w-lg mx-auto rounded-lg text-center">
      <p className="text-lg text-gray-800 mb-4">Confirm Deletion</p>
      <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete the quiz "{deleteConfirmation}"?</p>
      <div className="flex justify-center">
        <button onClick={() => handleDeleteQuiz(deleteConfirmation)} className="px-4 py-2 bg-yellow-50 mr-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-2 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">Delete</button>
        <button onClick={() => setDeleteConfirmation(null)} className="px-4 py-2 bg-gray-300 bg-blue-100 ml-8 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">Cancel</button>
      </div>
    </div>
  </div>
)}



      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black bg-opacity-50 text-richblack-900">
          <div className="bg-white p-8 max-w-lg mx-auto rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Quiz Info</h3>
            <div className="mb-4">
              <label htmlFor="permission" className="block text-sm font-medium text-gray-700">RESULT</label>
              <input type="text" id="permission" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={editingInfo.permission} onChange={(e) => handleEditInfo('permission', e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="giveQuiz" className="block text-sm font-medium text-gray-700">Give Quiz</label>
              <input type="text" id="giveQuiz" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={editingInfo.giveQuiz} onChange={(e) => handleEditInfo('giveQuiz', e.target.value)} />
            </div>
            <div className="flex justify-center">
              <button onClick={handleSaveInfo} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">Save</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayQuizzes;
