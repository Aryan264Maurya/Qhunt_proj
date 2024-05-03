import { apiConnector } from "../apiconnector";
import { resultEndpoints } from "../apis";

const {
  GET_ALL_RESULT,
  GET_NAME_RESULT,
  GET_QUIZ_RESULT,
  STORE_RESULT,
  GET_ALL_STUDENT_RESULT,
} = resultEndpoints;

export const storeResult = async (resultData) => {
    try {
      // Make a POST request to the STORE_RESULT endpoint
      const response = await apiConnector("POST",STORE_RESULT, resultData);
  
      // Check if the request was successful
      if (response.status === 200) {
        return response.data; // Return the response data if needed
      } else {
        throw new Error("Failed to store result");
      }
    } catch (error) {
      console.error("Error storing result:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };
// Function to get all results
export const getAllResults = async () => {
  try {
    const response = await apiConnector("GET",GET_ALL_RESULT);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch all results");
    }
  } catch (error) {
    console.error("Error fetching all results:", error);
    throw error;
  }
};

// Function to get results based on quiz name
export const getResultByQuizName = async (quizName) => {
  try {
    const response = await apiConnector("GET",`${GET_QUIZ_RESULT}/${quizName}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch results by quiz name");
    }
  } catch (error) {
    console.error("Error fetching results by quiz name:", error);
    throw error;
  }
};

// Function to get results based on user name
export const getResultByUserName = async (userName) => {
  try {
    const response = await apiConnector("GET",`${GET_NAME_RESULT}?username=${userName}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch results by user name");
    }
  } catch (error) {
    console.error("Error fetching results by user name:", error);
    throw error;
  }
};


export const getResultByTeacherName = async (teacherName) => {
  try {
    const response = await apiConnector("GET",`${GET_ALL_STUDENT_RESULT}?teacherName=${teacherName}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch results by Teacher name");
    }
  } catch (error) {
    console.error("Error fetching results by Teacher name:", error);
    throw error;
  }
};
