// Import necessary modules
import { apiConnector } from "../apiconnector";
import { questionEndpoints } from "../apis";
import { setExtraInfo } from "../../slice/ExtraInfoSlice";

// Destructure endpoint from questionEndpoints
const { CREATE_EXTRA_INFO ,UPDATE_EXTRA_INFO} = questionEndpoints;

// Define action creator to create extra info
export const CreateExtraInfo = (extraInfoData) => async (dispatch) => {
    try {
        // Make API request to create extra info
        const response = await apiConnector("POST", CREATE_EXTRA_INFO, extraInfoData);
        if (response.status === 200) {
            // If successful, dispatch the action to set extra info in the state
            dispatch(setExtraInfo(extraInfoData));
            return response.data; // Return response data if needed
        } else {
            throw new Error("Failed to create extra info");
        }
    } catch (error) {
        throw new Error("An error occurred while creating extra info: " + error.message);
    }
};

export const getExtraQuiz = async (quizName) => {
    try {
      console.log(quizName);
      if (!quizName) {
        throw new Error("Quiz name is required");
      }
    
      const response = await apiConnector("GET", `${CREATE_EXTRA_INFO}?quizName=${quizName}`);
      console.log("response")
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        console.log('Extra info:', data);
        return data; // Return fetched quizzes
      } else {
        throw new Error('Failed to fetch quizzes');
      }
    } catch (error) {
      throw new Error('Error fetching quizzes: ' + error.message);
    }
  };


 

  export const updateExtraQuiz = async (data) => {
    try {
        const { quizName, permission, giveQuiz } = data;

        if (!quizName || !permission || !giveQuiz) {
            throw new Error("Quiz name, permission, and giveQuiz are required");
        }

        const response = await apiConnector("POST", `${UPDATE_EXTRA_INFO}`, data);

        if (response.status === 200) {
            console.log('Extra info updated successfully');
        } else {
            throw new Error('Failed to update extra info');
        }
    } catch (error) {
        throw new Error('Error updating extra info: ' + error.message);
    }
};
