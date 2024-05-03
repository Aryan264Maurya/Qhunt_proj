import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    question: '',
    options: ['', '', ''],
    correctAnswer: '',
    extraInfo: {
        passMarks: 0,
        totalMarks: 0,
        timeDuration: 0,
        permission: 'NO',
        students: [],
    }
};

const createQuestionSlice = createSlice({
    name: "createQ",
    initialState: initialState,
    reducers: {
        setTeacherName(state, action) {
            state.question = action.payload;
        },
        setQuizName(state, action) {
            state.quizName = action.payload;
        },
        setQuestion(state, action) {
            // Assuming you have an array to store multiple questions
            state.questions.push(action.payload);
        },
        setOptions(state, action) {
            // Assuming you have an array to store options for a specific question
            state.questions[action.payload.index].options = action.payload.options;
        },
        setAnswer(state, action) {
            // Assuming you have an array to store correct answers for each question
            state.questions[action.payload.index].correctAnswer = action.payload.answer;
        },
        setExtraInfo(state, action) {
            console.log("insise slice")
            console.log(action.payload);
            state.extraInfo = action.payload;
        }
    },
});

export const { setTeacherName, setQuizName, setQuestion, setOptions, setAnswer, setExtraInfo } = createQuestionSlice.actions;

export default createQuestionSlice.reducer;
