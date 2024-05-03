import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    question: '',
    options: ['', '', ''],
    correctAnswer: '',
};

const MultiQuestionSlice = createSlice({
    name: "createMultiQ",
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
        setOptions(state, action) {
            state.options = action.payload;
        },
        setAnswer(state, action) {
           
            state.correctAnswer = action.payload;
        },
    },
});

export const { setTeacherName,setQuizName,setQuestion, setOptions, setAnswer } = MultiQuestionSlice.actions;

export default MultiQuestionSlice.reducer;
