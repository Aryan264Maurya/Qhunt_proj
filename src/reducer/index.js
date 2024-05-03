import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slice/authSlice";
import profileReducer from "../slice/profileSlice";
import CreateQuestionReducer from "../slice/CreateQuestionSlice";
import MultiQuestionSlice from "../slice/MultiQuestionSlice";
import TrueQuestion from "../slice/TrueQuestionSlice";
import DisplayQuiz from "../slice/DisplayQuiz";
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    createQ: CreateQuestionReducer,
    createMultiQ: MultiQuestionSlice,
    createTrueQ:TrueQuestion,
    DisplayQ:DisplayQuiz,
});

export default rootReducer;
