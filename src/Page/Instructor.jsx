import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getResultByTeacherName } from "../services/operations/Result";
import Piechart from "../components/Result/PieChart";
import LineChart from "../components/Result/LineChart";
import BarChart from "../components/Result/BarChart";
import { AiOutlineClose } from 'react-icons/ai';

const Instructor = () => {
  const { user } = useSelector((state) => state.profile);
  const [results, setResults] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState("");

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

  const groupResultsByQuizName = () => {
    const groupedResults = {};
    results.forEach((result) => {
      if (!groupedResults[result.quizname]) {
        groupedResults[result.quizname] = [];
      }
      groupedResults[result.quizname].push({
        username: result.username,
        points: result.points,
        achieved: result.achived,
      });
    });
    return groupedResults;
  };

  const handleQuizSelect = (quizName) => {
    setSelectedQuiz(quizName === selectedQuiz ? null : quizName);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChart("");
  };

  const renderChart = () => {
    switch (selectedChart) {
      case "pie":
        return (
          <div className="flex justify-center">
            <Piechart quiz={selectedQuiz} />
          </div>
        );
      case "line":
        return (
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
              <LineChart quiz={selectedQuiz} />
            </div>
          </div>
        );
      case "both":
        return (
          <div className="flex justify-between">
            <div className="w-1/2">
              <div className="flex justify-center">
                <Piechart quiz={selectedQuiz} />
              </div>
            </div>
            <div className="w-1/2">
              <div className="bg-gray-100 rounded-lg shadow-md p-4">
                <LineChart quiz={selectedQuiz} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Result Of All Quiz</h2>
      {Object.entries(groupResultsByQuizName()).map(([quizname, users]) => (
        <div key={quizname} className="mb-8 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-2">Quiz Name</h2>
            <h3>{quizname}</h3>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                onClick={() => handleQuizSelect(quizname)}
              >
                {selectedQuiz === quizname ? "Hide" : "Show"} Results
              </button>
              {selectedQuiz === quizname && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => {
                    setSelectedQuiz(quizname);
                    openModal();
                  }}
                >
                  Show Analysis
                </button>
              )}
            </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-black font-bold">Choose Chart Type</h2>
              <button onClick={closeModal} className="focus:outline-none">
                <AiOutlineClose className="text-gray-600 hover:text-gray-800 cursor-pointer w-6 h-6 bg-black" />
              </button>
            </div>
            <div className="flex justify-around mb-4">
              <button
                className="px-4 py-2 bg-yellow-50 rounded hover:bg-yellow-100"
                onClick={() => setSelectedChart("pie")}
              >
                Passed v/s Failed
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setSelectedChart("line")}
              >
                Marks Analysis
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                onClick={() => setSelectedChart("both")}
              >
                Both 
              </button>
            </div>
            <div>{renderChart()}</div>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructor;
