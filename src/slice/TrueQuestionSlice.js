import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizName:'',
    teacherName:'',
    question: '',
    correctAnswer: '',
};

const TrueQuestionSlice = createSlice({
    name: "createTrueQ",
    initialState: initialState,
    reducers: {
        setTeacherName(state,action){
            state.question = action.payload;
        },
        setQuizName(state,action){
            state.question = action.payload;
        },
        setQuestion(state, action) {
            state.question = action.payload;
        },
        setAnswer(state, action) {
           state.correctAnswer = action.payload;
        },
    },
});

export const { setQuizName,setQuestion, setTeacherName, setAnswer } = TrueQuestionSlice.actions;

export default TrueQuestionSlice.reducer;
