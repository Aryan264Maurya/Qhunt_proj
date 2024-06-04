import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./Page/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./Page/Login"
import Signup from "./Page/Signup"
import MyProfile from "./components/core/Dashboard/MyProfile";
import TypeofQuiz from "./Page/TeacherQuiz/TypeofQuiz";
import QuizHistory from "./Page/studentQuiz/QuizHistory"
import Instructor from "./Page/Instructor";
import TakeQuiz from "./Page/studentQuiz/TakeQuiz"
import Dashboard from "./Page/Dashboard";
import Settings from "./components/core/Dashboard/Settings";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import ForgotPassword from "./Page/ForgotPassword";
import UpdatePassword from "./Page/UpdatePassword";
import VerifyEmail from "./Page/VerifyEmail";
import GetMyQuiz from "./Page/TeacherQuiz/getQuiz";
import QuizWindow from "./Page/studentQuiz/QuizWindow";
import About from "./Page/About";
import Contact from "./Page/Contact"
import AvailableQuiz from "./Page/studentQuiz/AvailableQuiz";
function App() {
  // const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
<Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    > 
      <Route path="dashboard/my-quiz" element={<GetMyQuiz />}/>
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      <Route path="dashboard/add-quiz" element={<TypeofQuiz />} />
      <Route path="dashboard/quiz-history" element={<QuizHistory/>}/>
      <Route path="/quiz-window" element={<QuizWindow/>}></Route>
      <Route path="dashboard/instructor" element={<Instructor/>}/>
       <Route path="dashboard/quiz-practice" element={<AvailableQuiz/>}/>
    </Route>
    <Route path="dashboard/take-quiz" element={<TakeQuiz/>}/>
     <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
       <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
         
        > 
         
        </Route>
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About/>} />
       
       

      
      </Routes>
    </div>
  );
}

export default App;
