import React, { useState } from 'react';
import NewQuizzes from './NewQuiz'; // Import component for New Quizzes
import PracticeQuizzes from './PracticeQuiz'; // Import component for Practice Quizzes
// import AvailableQuiz from './AvailableQuiz';

export default function TakeQuiz() {
  // Define state to keep track of selected button and whether a quiz type is selected
  const [selectedButton, setSelectedButton] = useState(null);
  const [quizSelected, setQuizSelected] = useState(false);

  // Function to handle selecting a quiz type
  const handleSelectQuizType = (type) => {
    setSelectedButton(type);
    setQuizSelected(true);
  };

  return (
    <div className='text-white mt-10 mx-auto max-w-2xl'>
      {/* Render buttons for each type of quiz only if a quiz type is not selected */}
      {!quizSelected && (
        <div className="flex justify-center mt-6 space-x-4">
          {/* Button for New Quizzes */}
          <button onClick={() => handleSelectQuizType('new')} 
          className="mt-6 ml-10 mb-10 mr-24 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">New Quizzes</button>
          
          {/* Button for Practice Quizzes */}
          <button onClick={() => handleSelectQuizType('practice')} 
          className="mt-6 ml-10 mb-10 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Practice Quizzes</button>
        </div>
      )}

      {/* Render components based on selected button */}
      {selectedButton === 'new' && quizSelected && <NewQuizzes />}
      {selectedButton === 'practice' && quizSelected && <PracticeQuizzes />}
    </div>
  );
}
