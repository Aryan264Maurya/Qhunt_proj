const ExtraInfo = require("../models/ExtraInfo");

exports.extraInfo = async (req, res) => {
    try {
        await ExtraInfo.insertMany(req.body);
        res.json(req.body);
    } catch (err) {
        res.json(err);
    }
};

exports.getAllextraInfo= async (req, res) => {
    try {
        const quizName = req.query.quizName;

        if (!quizName) {
            return res.status(400).json({ error: "quiz name is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        
        const allData=await ExtraInfo.find({quizName:quizName});

        res.json(allData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getEveryExtraInfo = async (req, res) => {
    try {
        // Find all extra information
        const allExtraInfo = await ExtraInfo.find();

        res.json(allExtraInfo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateInfo= async (req, res) => {
    try {
        const { quizName, permission, giveQuiz } = req.body;

        if (!quizName || !permission || !giveQuiz) {
            return res.status(400).json({ error: "quizName, permission, and giveQuiz are required" });
        }

        // Update permission and giveQuiz fields in the ExtraInfo model for the given quizName
        await ExtraInfo.updateMany({ quizName }, { permission, giveQuiz });

        res.json({ message: "Permissions updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

