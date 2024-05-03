const mongoose = require("mongoose");

const createQuestionSchema = new mongoose.Schema({
    teacherName:{type:String,deafult:''},
    quizName: { type: String, default: '' },
    questions: { type: Array, default: [] },
   
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Questioncreate", createQuestionSchema);
