const mongoose = require("mongoose");

const quizProgress = new mongoose.Schema({
	quizID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Quiz",
	},
	completedquiz: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],
});

module.exports = mongoose.model("quizProgress", quizProgress);