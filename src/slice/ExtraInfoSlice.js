// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for extra info
const initialState = {
    passMarks: 0,
    totalMarks: 0,
    timeDuration: 0,
    permission: 'NO',
    students: [],
};

// Create slice for extra info
const extraInfoSlice = createSlice({
    name: "extraInfo",
    initialState: initialState,
    reducers: {
        // Reducer functions to set different properties of extra info
        setPassMarks(state, action) {
            state.passMarks = action.payload;
        },
        setTotalMarks(state, action) {
            state.totalMarks = action.payload;
        },
        setTimeDuration(state, action) {
            state.timeDuration = action.payload;
        },
        setPermission(state, action) {
            state.permission = action.payload;
        },
        setStudents(state, action) {
            state.students = action.payload;
        },
        // Action to set entire extra info object
        setExtraInfo(state, action) {
            return action.payload;
        },
    },
});

// Export action creators and reducer
export const { setPassMarks, setTotalMarks, setTimeDuration, setPermission, setStudents, setExtraInfo } = extraInfoSlice.actions;
export default extraInfoSlice.reducer;
