import { apiConnector } from "../apiconnector";
import { questionEndpoints } from "../apis";
import { setQuizName, setQuestion, setAnswer, setTeacherName } from "../../slice/TrueQuestionSlice"; // Import setTeacherName action

const { CREATE_TQUESTIONS } = questionEndpoints;

export const TrueQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await apiConnector("POST", CREATE_TQUESTIONS, questionData);
        if (response.status === 200) {
            // Dispatch actions to update Redux store
            const createdQuiz = response.data.quiz; // Adjust accordingly to your backend response

            // Dispatch actions to update Redux store with question details
            dispatch(setQuizName(createdQuiz.quizName));
            dispatch(setQuestion(questionData.question));
            dispatch(setAnswer(questionData.correctAnswer));
            
            // Set teacher's name
            dispatch(setTeacherName(questionData.teacherName));

            return response.data; // Assuming backend returns created question details
        } else {
            throw new Error("Failed to create question");
        }
    } catch (error) {
        throw new Error("An error occurred while creating question: " + error.message);
    }
};
