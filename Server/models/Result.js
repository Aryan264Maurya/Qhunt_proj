const mongoose = require("mongoose");

// Define the Courses schema
const resultSchema = new mongoose.Schema({
	username:{type: String},
    teacherName:{type: String},
    quizname:{type : String},
    points:{type:Number,default:0},
    achived:{type:Number,default :0},
    passed:{type:String},
    showResult:{type:String},
    createdAt:{type:Date, default:Date.now},

});

// Export the Courses model
module.exports = mongoose.model("result", resultSchema);