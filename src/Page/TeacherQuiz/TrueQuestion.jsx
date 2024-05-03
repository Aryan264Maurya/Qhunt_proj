import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TrueQuestion } from '../../services/Questions/TrueQuestion';

export default function CreateQuestionForm() {
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.profile);
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, question: '', answer: '' }]);
  const teacherName = user ? `${user.firstName} ${user.lastName}` : '';
  const [extraInfo, setExtraInfo] = useState({
    passMarks: 0,
    totalMarks: 0,
    timeDuration: 0,
    permission: 'NO',
    students: [],
    giveQuiz: 'NO', // Newly added field
  }); 
  const [extraInfoVisible] = useState(false); 

  const handleChange = (e, questionIndex) => {
    const { name, value } = e.target;
    if (name === 'quizName') {
      setQuizName(value);
    } else {
      const updatedQuestions = questions.map((question, index) =>
        index === questionIndex ? { ...question, [name]: value } : question
      );
      setQuestions(updatedQuestions);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { id: questions.length + 1, question: '', answer: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { quizName, teacherName, questions, extraInfo }; 
      const response = await dispatch(TrueQuestion(formData));
      toast.success('Questions created successfully');
      console.log('inside create question jsx');
      console.log(response); 
      toast.success('Quiz Created Successfully');
    } catch (error) {
      toast.error('Failed to create questions');
    }
  };

  return (
    <div className="text-white mt-10 ml-20 flex">
      <div className="w-3/4">
        <h2 className="text-white w-1000">Create Questions</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quizName">Quiz Code:</label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            value={quizName}
            className="w-450 ml-5 mt-2 mr-24 rounded-[0.5rem] bg-richblack-700 p-[8px] pr-1 text-richblack-5"
            onChange={(e) => handleChange(e)}
            required
          />

          {questions.map((question, questionIndex) => (
            <div key={question.id}>
              <label htmlFor={`question${question.id}`}>Question {question.id} </label>
              <input
                type="text"
                id={`question${question.id}`}
                name="question"
                className="w-450 mt-2 ml-5 rounded-[0.5rem] bg-richblack-700 p-[8px] pr-1 text-richblack-5"
                value={question.question}
                onChange={(e) => handleChange(e, questionIndex)}
                required
              />
              <div>
                <label>Answer:</label>
                <button
                  type="button"
                  className={`mr-2 mt-4 ml-6 rounded-[8px] bg-richblack-800 py-[8px] px-[12px] font-medium text-white ${
                    question.answer === 'True' ? 'bg-green-500' : ''
                  }`}
                  onClick={() => handleChange({ target: { name: 'answer', value: 'True' } }, questionIndex)}
                >
                  True
                </button>
                <button
                  type="button"
                  className={`rounded-[8px]  ml-20 bg-richblack-800 py-[8px] px-[12px] font-medium text-white ${
                    question.answer === 'False' ? 'bg-green-500' : ''
                  }`}
                  onClick={() => handleChange({ target: { name: 'answer', value: 'False' } }, questionIndex)}
                >
                  False
                </button>
              </div>
              <button
                type="button"
                className="mt-2 rounded-[8px] bg-red-500 py-[8px] px-[12px] bg-caribbeangreen-800 font-medium text-white"
                onClick={() => handleRemoveQuestion(question.id)}
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-6 mr-24 rounded-[8px] bg-richblue-900 py-[8px] px-[12px] font-medium text-white"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>

          <button
            type="submit"
            className="mt-6 ml-10 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/4 ml-20">
        {extraInfoVisible && (
          <div>
            <label htmlFor="passMarks">Pass Marks:</label>
            <input
              type="number"
              id="passMarks"
              name="passMarks"
              value={extraInfo.passMarks}
              onChange={(e) => setExtraInfo({ ...extraInfo, passMarks: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="totalMarks">Total Marks:</label>
            <input
              type="number"
              id="totalMarks"
              name="totalMarks"
              value={extraInfo.totalMarks}
              onChange={(e) => setExtraInfo({ ...extraInfo, totalMarks: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="timeDuration">Time Duration:</label>
            <input
              type="number"
              id="timeDuration"
              name="timeDuration"
              value={extraInfo.timeDuration}
              onChange={(e) => setExtraInfo({ ...extraInfo, timeDuration: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="permission">Permission:</label>
            <select
              id="permission"
              name="permission"
              value={extraInfo.permission}
              onChange={(e) => setExtraInfo({ ...extraInfo, permission: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black ml-4 mt-2"
              required
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <label htmlFor="giveQuiz">Give Quiz:</label>
            <select
              id="giveQuiz"
              name="giveQuiz"
              value={extraInfo.giveQuiz}
              onChange={(e) => setExtraInfo({ ...extraInfo, giveQuiz: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black ml-4 mt-2"
              required
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
