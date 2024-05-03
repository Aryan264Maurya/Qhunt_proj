const Result = require("../models/Result");

exports.getresultQuizName= async (req, res) => {
    try {
        const Name = req.query.quizname;

        if (!Name) {
            return res.status(400).json({ error: "quizname is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        const response= await Result.find({ quizname: Name });

        // Find all data from MultiQuestion model with the given teacher name
       
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getresultUserName= async (req, res) => {
    try {
        const Name = req.query.username;

        if (!Name) {
            return res.status(400).json({ error: "Teacher name is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        const response= await Result.find({ username: Name });

        // Find all data from MultiQuestion model with the given teacher name
       
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getresultTeacherName= async (req, res) => {
    try {
        const Name = req.query.teacherName;

        if (!Name) {
            return res.status(400).json({ error: "Teacher name is required" });
        }

        // Find all data from CreateQuestion model with the given teacher name
        const response= await Result.find({ teacherName: Name });

        // Find all data from MultiQuestion model with the given teacher name
       
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



exports.getAllresult=async (req,res)=>{
    try{
        const r=await Result.find()
        res.json(r);

    }catch(err){
        res.json(err);
    }
}


exports.storeAllresult=async (req,res)=>{
    try{
        const {username,teacherName,quizname,points,achived,passed,showResult}=req.body;
        if(!username && !quizname && !teacherName)throw new Error("data not provided");

        Result.create({username,teacherName,quizname,points,achived,passed,showResult});

    }catch(err){
        res.json(err);
    }
}


exports.dropResult=async (req,res)=>{
    try{
        await Result.deleteMany();
        res.json("result deleted");

    }catch(err){
        res.json(err);
    }
}

