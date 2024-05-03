import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { getResultByTeacherName } from "../services/operations/Result";

const Instructor = () => {
  const { user } = useSelector((state) => state.profile);
  const [results, setResults] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State to store the selected quiz

  const teacherName = `${user.firstName} ${user.lastName}`;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResultByTeacherName(teacherName);
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [teacherName]);

  // Function to group results by quizname
  const groupResultsByQuizName = () => {
    const groupedResults = {};
    results.forEach((result) => {
      if (!groupedResults[result.quizname]) {
        groupedResults[result.quizname] = [];
      }
      groupedResults[result.quizname].push({
        username: result.username,
        points: result.points,
        achieved: result.achived, // Assuming this is the property for achieved points
      });
    });
    return groupedResults;
  };

  // Function to handle the quiz selection
  const handleQuizSelect = (quizName) => {
    setSelectedQuiz(quizName === selectedQuiz ? null : quizName);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Result Of All Quiz</h2>
      {Object.entries(groupResultsByQuizName()).map(([quizname, users]) => (
        <div key={quizname} className="mb-8 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-2">Quiz Name</h2>
            <h3 >{quizname}</h3>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleQuizSelect(quizname)}
            >
              {selectedQuiz === quizname ? "Hide" : "Show"} Results
            </button>
          </div>
          {selectedQuiz === quizname && (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Student Name</th>
                  <th className="px-4 py-2">Marks Obtained</th>
                  <th className="px-4 py-2">Total Marks</th>
                  <th className="px-4 py-2">Attempts</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-center">{user.username}</td>
                    <td className="px-4 py-2 text-center">{user.achieved}</td>
                    <td className="px-4 py-2 text-center">{user.points}</td>
                    <td className="px-4 py-2 text-center">
                      {users.filter((u) => u.username === user.username).length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default Instructor;
