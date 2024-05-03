const express = require("express")
const router = express.Router()
// const { auth } = require("../middlewares/auth")
const {
   getAllquestions
  } = require("../controllers/GetQuizes")

// router.post("/quiz",CreateQuestions);
// router.post("/mquestions",MultiQuestion);
// router.post("/tquestions",TrueQuestion);
router.get("/getquizes",getAllquestions);
module.exports = router