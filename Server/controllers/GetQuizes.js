const CreateQuestions=require("../models/CreateQuestion");
const MultiQuestion=require("../models/MultiQuestion");
const TrueQuestion=require("../models/TrueQuestion")


exports.getAllquestions = async (req, res) => {
    try {
        const Name = req.query.quizName;

        if (!Name) {
            return res.status(400).json({ error: "Teacher name is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        const createQuestions = await CreateQuestions.find({ quizName: Name });

        // Find all data from MultiQuestion model with the given teacher name
        const multiQuestions = await MultiQuestion.find({ quizName: Name });

        // Find all data from TrueQuestion model with the given teacher name
        const trueQuestions = await TrueQuestion.find({ quizName: Name });

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


