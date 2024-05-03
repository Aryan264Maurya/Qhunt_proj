import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { CreateQuestions } from '../../services/operations/CreateQuestions';
import { CreateExtraInfo } from '../../services/operations/ExtraInfo';

export default function CreateQuestionForm() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, question: '', options: ['', '', '', ''], answer: '' }]);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [extraInfo, setExtraInfoState] = useState({
    quizName: '',
    teacherName: `${user.firstName} ${user.lastName}`,
    passMarks: 0,
    totalMarks: 0,
    timeDuration: 0,
    permission: 'NO',
    students: [],
    giveQuiz: 'NO',
  });

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
    } else if (name === 'quizName') {
      setQuizName(value);
    } else {
      const updatedQuestions = questions.map((question, index) =>
        index === questionIndex ? { ...question, [name]: value } : question
      );
      setQuestions(updatedQuestions);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { id: questions.length + 1, question: '', options: ['', '', '', ''], answer: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { quizName, teacherName: `${user.firstName} ${user.lastName}`, questions };
      const response = await dispatch(CreateQuestions(formData));
      toast.success("Quiz created successfully");
      console.log("inside create question jsx");
      console.log(response);
      toast.success("  Quiz Created Succesfully");
    } catch (error) {
      toast.success("  Quiz Created Succesfully");
    }
  };

  const handleExtraInfoSubmit = async () => {
    try {
      const updatedExtraInfo = { ...extraInfo, quizName };
      const response = await dispatch(CreateExtraInfo(updatedExtraInfo));
      toast.success("Extra info created successfully");
      console.log("inside create extra info jsx");
      console.log(response);
    } catch (error) {
      toast.error("Failed to create extra info");
    }
    setShowExtraInfo(false);
  };

  return (
    <div className='text-white mt-10 ml-20 flex'>
      <div className="w-3/4 mr-10">
        <h2 className=' text-white w-1000'>Create Questions</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quizName">Quiz Code:</label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            value={quizName}
            className="w-450 ml-5 mt-2 mr-24 rounded-[0.5rem] bg-richblack-700 p-[8px] pr-1 text-richblack-5"
            onChange={(e) => setQuizName(e.target.value)}
            required
          />

          {questions.map((question, questionIndex) => (
            <div key={question.id}>
              {/* Question Input Fields */}
              <label htmlFor={`question${question.id}`}>Question {question.id}</label>
              <input
                type="text"
                id={`question${question.id}`}
                name="question"
                className="w-450 mt-4 ml-5 rounded-[0.5rem] bg-richblack-700 p-[8px] pr-1 text-richblack-5"
                value={question.question}
                onChange={(e) => handleChange(e, questionIndex)}
                required
              />
              {/* Option Input Fields */}
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label htmlFor={`option${question.id}${optionIndex + 1}`}>Option {optionIndex + 1}</label>
                  <input
                    type="text"
                    id={`option${question.id}${optionIndex + 1}`}
                    name="options"
                    value={option}
                    className="w-400 mt-1 ml-9 rounded-[0.5rem] bg-richblack-700 p-[6px] pr-1 text-richblack-5"
                    data-questionindex={questionIndex}
                    data-optionindex={optionIndex}
                    onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                    required
                  />
                </div>
              ))}
              {/* Answer Input Field */}
              <label htmlFor={`answer${question.id}`}>Answer</label>
              <input
                type="text"
                id={`answer${question.id}`}
                name="answer"
                value={question.answer}
                className="w-400 ml-11 rounded-[0.5rem] bg-richblack-700 p-[5px] pr-1 text-richblack-5"
                onChange={(e) => handleChange(e, questionIndex)}
                required
              />
              <button
                type="button"
                className="mt-6 mr-10 rounded-[8px] bg-caribbeangreen-800 ml-3 py-[8px] px-[12px] font-medium text-white"
                onClick={() => handleRemoveQuestion(question.id)}
              >
                Remove
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

          <button
            type="button"
            onClick={() => setShowExtraInfo(!showExtraInfo)}
            className="mt-6 ml-10 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            {showExtraInfo ? 'Hide Extra Info' : 'Extra Info'}
          </button>
        </form>
      </div>

      <div className='w-1/4'>
        {showExtraInfo && (
          <div className='flex flex-col '>
            <label htmlFor="passMarks">Pass Marks:</label>
            <input
              type="number"
              id="passMarks"
              name="passMarks"
              value={extraInfo.passMarks}
              onChange={(e) => setExtraInfoState({ ...extraInfo, passMarks: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="totalMarks">Total Marks:</label>
            <input
              type="number"
              id="totalMarks"
              name="totalMarks"
              value={extraInfo.totalMarks}
              onChange={(e) => setExtraInfoState({ ...extraInfo, totalMarks: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="timeDuration">Time Duration:</label>
            <input
              type="number"
              id="timeDuration"
              name="timeDuration"
              value={extraInfo.timeDuration}
              onChange={(e) => setExtraInfoState({ ...extraInfo, timeDuration: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            />
            <label htmlFor="permission">Show Result:</label>
            <select
              id="permission"
              name="permission"
              value={extraInfo.permission}
              onChange={(e) => setExtraInfoState({ ...extraInfo, permission: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <label htmlFor="giveQuiz">Permission to take Quiz:</label>
            <select
              id="giveQuiz"
              name="giveQuiz"
              value={extraInfo.giveQuiz}
              onChange={(e) => setExtraInfoState({ ...extraInfo, giveQuiz: e.target.value })}
              className="rounded-md bg-gray-100 px-2 py-1 text-black"
              required
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <button
              type="button"
              onClick={handleExtraInfoSubmit}
              className="mt-2 rounded-[8px] bg-green-500 py-[8px] px-[12px] font-medium text-white"
            >
              Confirm Extra Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
