import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    question: '',
    options: ['', '', '',''],
    correctAnswer: '',
};








const DisplaySlice = createSlice({
    name: "DisplayQ",
    initialState: initialState,
    reducers: {
        setTeacherName(state,action){
            state.question = action.payload;
        },
        setQuizName(state, action) {
            state.quizName = action.payload;
        },
        setQuestion(state, action) {
            // Assuming you have an array to store multiple questions
            state.questions.push(action.payload);
            console.log("displayslice")
            console.log(action)
        },
        setOptions(state, action) {
            // Assuming you have an array to store options for a specific question
            state.questions[action.payload.index].options = action.payload.options;
        },
        setAnswer(state, action) {
            // Assuming you have an array to store correct answers for each question
            state.questions[action.payload.index].correctAnswer = action.payload.answer;
        },
    },
});

export const { setTeacherName,setQuizName, setQuestion, setOptions, setAnswer } = DisplaySlice.actions;

export default DisplaySlice.reducer;

