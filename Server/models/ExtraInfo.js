const mongoose = require("mongoose");

const ExtraInfoSchema = new mongoose.Schema({
	quizName: { type: String },
	teacherName: { type: String },
	passMarks:{type:Number ,default:0},
    totalMarks:{type:Number,default:0},
    timeDuration:{type:Number,default:0},
    permission:{type:String,default:"NO"},
    giveQuiz:{type:String,default:"NO"},
    students:{type:Array,default:[]},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ExtraInfo", ExtraInfoSchema);