const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes = require("./routes/Profile");
const resultRoutes=require("./routes/Result.js")
const getQuizRoutes=require("./routes/Getquiz.js")
const extraRoutes=require("./routes/ExtraInfo.js")
// const resultRoutes=require("./routes/Question.js")
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv=require("dotenv");
const createRoutes=require("./routes/CreateQuestion")
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();



//routes
app.use("/api/quiz/auth", userRoutes);
app.use("/api/quiz/profile", profileRoutes);
app.use("/api/quiz",resultRoutes);
app.use("/api/quiz/create",createRoutes);
app.use("/api/quiz/take",getQuizRoutes);
app.use("/api/quiz",extraRoutes);
//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

