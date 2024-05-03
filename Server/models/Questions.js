const mongoose = require("mongoose");

// Define the Courses schema
const questionSchema = new mongoose.Schema({
	questions:{type : Array ,default:[]},
	answer:{type :Array,default:[]},
	createdAt:{type: Date ,default:Date.now}
});

// Export the Courses model
module.exports = mongoose.model("Question", questionSchema);