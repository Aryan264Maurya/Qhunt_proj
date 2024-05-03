const mongoose = require("mongoose");

// Define the Tags schema
const quizTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Quiz",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", quizTypeSchema);