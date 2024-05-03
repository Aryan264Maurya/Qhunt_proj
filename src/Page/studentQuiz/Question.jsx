import React from 'react';

const Question = ({ question, options, selectedOption, handleOptionSelect }) => {
  return (
    <div className="question-container p-8 rounded-lg bg-gray-900 text-white text-left">
      <h1 className="text-3xl font-bold mb-4">{question}</h1>
      <div>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
