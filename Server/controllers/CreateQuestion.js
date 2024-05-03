const CreateQuestions = require("../models/CreateQuestion");
const MultiQuestion = require("../models/MultiQuestion");
const TrueQuestion = require("../models/TrueQuestion");
const ExtraInfo=require('../models/ExtraInfo');
// Get all questions for a given teacherName
exports.getAllquestions = async (req, res) => {
    try {
        const teacherName = req.query.teacherName;

        if (!teacherName) {
            return res.status(400).json({ error: "Teacher name is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        const createQuestions = await CreateQuestions.find({ teacherName: teacherName });

        // Find all data from MultiQuestion model with the given teacher name
        const multiQuestions = await MultiQuestion.find({ teacherName: teacherName });

        // Find all data from TrueQuestion model with the given teacher name
        const trueQuestions = await TrueQuestion.find({ teacherName: teacherName });

        // Combine data from all models
        const allData = {
            createQuestions: createQuestions,
            multiQuestions: multiQuestions,
            trueQuestions: trueQuestions
        };

        res.json(allData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create new CreateQuestions
// Create new CreateQuestions
exports.CreateQuestions = async (req, res) => {
    try {
        const { quizName } = req.body;

        // Check if quizName already exists
        const existingQuestion = await CreateQuestions.findOne({ quizName: quizName });
        if (existingQuestion) {
            return res.status(400).json({ error: `Quiz with name "${quizName}" already exists` });
        }

        // Insert new questions if quizName is unique
        await CreateQuestions.insertMany(req.body);
        res.json(req.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create new MultiQuestion
exports.MultiQuestion = async (req, res) => {
    try {
        const { quizName } = req.body;

        // Check if quizName already exists
        const existingQuestion = await MultiQuestion.findOne({ quizName: quizName });
        if (existingQuestion) {
            return res.status(400).json({ error: `Quiz with name "${quizName}" already exists` });
        }

        // Insert new questions if quizName is unique
        await MultiQuestion.insertMany(req.body);
        res.json(req.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create new TrueQuestion
exports.TrueQuestion = async (req, res) => {
    try {
        const { quizName } = req.body;

        // Check if quizName already exists
        const existingQuestion = await TrueQuestion.findOne({ quizName: quizName });
        if (existingQuestion) {
            return res.status(400).json({ error: `Quiz with name "${quizName}" already exists` });
        }

        // Insert new questions if quizName is unique
        await TrueQuestion.insertMany(req.body);
        res.json(req.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Delete a quiz based on quizName
exports.deleteQuiz = async (req, res) => {
    try {
        const quizName = req.query.quizName;

        if (!quizName) {
            return res.status(400).json({ error: "Quiz name is required" });
        }

        // Delete from CreateQuestion model
        await CreateQuestions.deleteMany({ quizName: quizName });

        // Delete from MultiQuestion model
        await MultiQuestion.deleteMany({ quizName: quizName });

        // Delete from TrueQuestion model
        await TrueQuestion.deleteMany({ quizName: quizName });
        await ExtraInfo.deleteMany({quizName:quizName});
        res.json({ message: `Quiz "${quizName}" deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
