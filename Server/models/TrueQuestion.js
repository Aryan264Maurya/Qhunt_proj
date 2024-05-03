const mongoose = require("mongoose");

// Define the CreateQuestion schema
const TrueQuestionSchema = new mongoose.Schema({
    teacherName:{type:String,deafult:''},
    quizName:{type:String,deafult:''},
    questions: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

// Export the CreateQuestion model
module.exports = mongoose.model("Questiontrue", TrueQuestionSchema);
