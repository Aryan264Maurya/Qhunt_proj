import { apiConnector } from "../apiconnector";
import { questionEndpoints } from "../apis";



const { GET_STUDENT_QUIZ } = questionEndpoints;
export const DisplayQuiz = async (quizName) => {
    try {
      console.log(quizName);
      if (!quizName) {
        throw new Error("Quiz name is required");
      }
    
      const response = await apiConnector("GET", `${GET_STUDENT_QUIZ}?quizName=${quizName}`);
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

