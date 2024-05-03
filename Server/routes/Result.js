const express = require("express")
const router = express.Router()
// const { auth } = require("../middlewares/auth")
const {
     getAllresult,
     getresultQuizName,
     getresultUserName,
     storeAllresult,
     getresultTeacherName
  } = require("../controllers/Result")


router.post("/result",storeAllresult);
router.get("/result",getAllresult);
router.get("/qresult",getresultQuizName);
router.get("/uresult",getresultUserName);
router.get("/all-result",getresultTeacherName)
module.exports = router