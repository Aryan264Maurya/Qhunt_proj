import { apiConnector } from "../apiconnector";
import { questionEndpoints } from "../apis";
import { setQuizName,setQuestion, setAnswer, setOptions ,setTeacherName} from "../../slice/MultiQuestionSlice";
const { CREATE_MQUESTIONS } = questionEndpoints;

export const MultiQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await apiConnector("POST", CREATE_MQUESTIONS, questionData);
        if (response.status === 200) {
            // Dispatch actions to update Redux store
            const createdQuiz = response.data.quiz; // Adjust accordingly to your backend response
      
            // Dispatch actions to update Redux store with quiz name and questions
            dispatch(setQuizName(createdQuiz.quizName));
            dispatch(setQuestion(questionData.question));
            dispatch(setOptions(questionData.options));
            dispatch(setAnswer(questionData.correctAnswer));
            dispatch(setTeacherName(questionData.teacherName));
            return response.data; // Assuming backend returns created question details
        } else {
            throw new Error("Failed to create question");
        }
    } catch (error) {
        throw new Error("An error occurred while creating question: " + error.message);
    }
};
