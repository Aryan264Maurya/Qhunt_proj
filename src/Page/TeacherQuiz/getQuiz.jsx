import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { DisplayQuiz } from '../../services/operations/CreateQuestions';
import DisplayQuizzes from './teacher_quizData';

export default function GetMyQuiz() {
  const { user } = useSelector((state) => state.profile);
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      // Automatically fetch quizzes when user data is available
      const fullName = `${user.firstName} ${user.lastName}`;
      handleFindQuizzes(fullName);
    }
  }, [user]);

  const handleFindQuizzes = async (teacherName) => {
    try {
      console.log(`Finding quizzes for teacher: ${teacherName}`);
      toast.success(`Finding quizzes for teacher: ${teacherName}`);
      
      // Call the DisplayQuiz function passing the teacherName directly
      const response = await DisplayQuiz(teacherName);
      
      // Update state with fetched quizzes
      setQuizzes(response);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to fetch quizzes');
    }
  };

  return (
    <div>
      {quizzes && <DisplayQuizzes quizzes={quizzes} />}
    </div>
  );
}

