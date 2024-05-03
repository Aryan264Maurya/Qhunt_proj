import { apiConnector } from "../apiconnector";
import { questionEndpoints } from "../apis";
import { setQuizName, setQuestion, setAnswer, setOptions, setTeacherName ,setExtraInfo} from "../../slice/CreateQuestionSlice";

const { CREATE_QUESTION, GET_QUIZ ,DELETE_QUIZ} = questionEndpoints;

export const CreateQuestions = (formData) => async (dispatch) => {
  try {
    const response = await apiConnector("POST", CREATE_QUESTION, formData);
    if (response.status === 200) {
      const createdQuiz = response.data.quiz;
      
      dispatch(setQuizName(createdQuiz.quizName));
      dispatch(setTeacherName(createdQuiz.teacherName));

      createdQuiz.questions.forEach((question) => {
        dispatch(setQuestion(question.question));
        dispatch(setOptions(question.options));
        dispatch(setAnswer(question.correctAnswer));
      });

      // Dispatch extra info
      dispatch(setExtraInfo({
        passMarks: formData.extraInfo.passMarks,
        totalMarks: formData.extraInfo.totalMarks,
        timeDuration: formData.extraInfo.timeDuration,
        permission: formData.extraInfo.permission,
        students: formData.extraInfo.students,
      }));

      return createdQuiz;
    } else {
      throw new Error("Failed to create quiz");
    }
  } catch (error) {
    throw new Error("An error occurred while creating quiz: " + error.message);
  }
};

export const DisplayQuiz = async (teacherName) => {
    try {
      console.log(teacherName);
      if (!teacherName) {
        throw new Error("Teacher name is required");
      }
    
      const response = await apiConnector("GET", `${GET_QUIZ}?teacherName=${teacherName}`);
      console.log("response")
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        console.log('Quizzes:', data);
        return data; // Return fetched quizzes
      } else {
        throw new Error('Failed to fetch quizzes');
      }
    } catch (error) {
      throw new Error('Error fetching quizzes: ' + error.message);
    }
  };

  export const DeleteQuiz = async (quizName) => {
    try {
        if (!quizName) {
            throw new Error("Quiz name is required");
        }

        const response = await apiConnector("DELETE", `${DELETE_QUIZ}?quizName=${quizName}`);
        if (response.status === 200) {
            const data = response.data;
            return data; // Return the response data
        } else {
            throw new Error('Failed to delete quiz');
        }
    } catch (error) {
        throw new Error('Error deleting quiz: ' + error.message);
    }
};