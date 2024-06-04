const express = require("express");
const router = express.Router();
const { 
    extraInfo,
    getAllextraInfo, 
    updateInfo,
    getEveryExtraInfo,
} = require("../controllers/Extrainfo"); // Corrected import path

router.post("/einfo", extraInfo);
router.get("/einfo",getAllextraInfo);
router.post("/up-einfo",updateInfo);
router.get("/all-einfo", getEveryExtraInfo);
module.exports = router;
