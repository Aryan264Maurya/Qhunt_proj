import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getResultByUserName } from '../../services/operations/Result';
import { getExtraQuiz } from '../../services/operations/ExtraInfo'; // Import the getExtraQuiz function

const UserResultHistory = () => {
  const { user } = useSelector((state) => state.profile);
  const [userResults, setUserResults] = useState([]);
  const [extraInfo, setExtraInfo] = useState({}); // State to hold extra quiz info

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        if (user && user.firstName && user.lastName) {
          const username = `${user.firstName} ${user.lastName}`;
          const results = await getResultByUserName(username);
          setUserResults(results);
          console.log("result-->", results);
          
          // Fetch extra info for each quiz
          const extraInfoPromises = results.map(result => getExtraQuiz(result.quizname));
          const extraInfoArray = await Promise.all(extraInfoPromises);
          const extraInfoMap = results.reduce((acc, result, index) => {
            acc[result.quizname] = extraInfoArray[index][0]; // Access the first element in the array
            return acc;
          }, {});
          setExtraInfo(extraInfoMap);
          console.log("extraInfo-->", extraInfoMap.permission);
        }
      } catch (error) {
        console.error('Error fetching results by user name:', error);
      }
    };

    if (user) {
      fetchUserResults();
    }
  }, [user]);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">User Result History</h2>
      {userResults.length > 0 && (
        <div>
          <ul className="divide-y divide-gray-200">
            {userResults.map((result, index) => {
              const extra = extraInfo[result.quizname] || {};
              return (
                <li key={index} className="py-4 flex justify-between">
                  <div>
                    <p className="text-lg font-semibold">Quiz Name: {result.quizname}</p>
                    <p className="text-sm text-gray-500">Teacher Name: {result.teacherName}</p>
                  </div>
                  <div className="flex items-center"> {/* Align content to the center */}
                    { extra.permission === 'YES' && (
                      <>
                        <p className="text-sm">Score: {result.achived} / {result.points}</p>
                        <p className={`text-sm ${result.passed === 'yes' ? 'bg-caribbeangreen-400' : 'bg-brown-900'} 
                          rounded-[8px] py-[8px] px-[12px] font-medium text-white ml-4`}>
                          {result.passed === 'yes' ? 'Passed' : 'Failed'}
                        </p>
                      </>
                    )}
                    { extra.permission=== 'NO' && (
                      <p className="mt-6 ml-10 rounded-[8px] bg-pink-50 py-[8px] px-[12px] font-medium text-richblack-900">
                        Result Pending from Teacher side
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserResultHistory;
