const mongoose = require("mongoose");

// Define the CreateQuestion schema
const MultiQuestionSchema = new mongoose.Schema({
    quizName:{type:String,deafult:''},
    teacherName:{type:String,deafult:''},
    questions: { type: Array, default: [] },
    // answer: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

// Export the CreateQuestion model
module.exports = mongoose.model("Questionmulti", MultiQuestionSchema);
