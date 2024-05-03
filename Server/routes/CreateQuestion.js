const express = require("express")
const router = express.Router()
// const { auth } = require("../middlewares/auth")
const {
    CreateQuestions,
    MultiQuestion,
    TrueQuestion,
    getAllquestions,
    deleteQuiz
  } = require("../controllers/CreateQuestion")

router.post("/questions",CreateQuestions);
router.post("/mquestions",MultiQuestion);
router.post("/tquestions",TrueQuestion);
router.get("/getquizes",getAllquestions);
router.delete("/delquiz",deleteQuiz)
module.exports = router