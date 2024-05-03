import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getResultByUserName } from '../../services/operations/Result';

const UserResultHistory = () => {
  const { user } = useSelector((state) => state.profile);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        if (user && user.firstName && user.lastName) {
          const username = `${user.firstName} ${user.lastName}`;
          const results = await getResultByUserName(username);
          setUserResults(results);
        }
      } catch (error) {
        console.error('Error fetching results by user name:', error);
      }
    };

    if (user) {
      fetchUserResults();
    }
  }, [user]); // Make sure to include user in the dependency array

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">User Result History</h2>
      {userResults.length > 0 && (
        <div>
          <ul className="divide-y divide-gray-200">
            {userResults.map((result, index) => (
              <li key={index} className="py-4 flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Quiz Name: {result.quizname}</p>
                  <p className="text-sm text-gray-500">Teacher Name: {result.teacherName}</p>
                </div>
                <div className="flex items-center"> {/* Align content to the center */}
                  {result.showResult === 'YES' && (
                    <>
                      <p className="text-sm">Score: {result.achived} / {result.points}</p>
                      <p className={`text-sm ${result.passed === 'yes' ? 'bg-caribbeangreen-400' : 'bg-brown-900'} 
                        rounded-[8px] py-[8px] px-[12px] font-medium text-white ml-4`}>
                        {result.passed === 'yes' ? 'Passed' : 'Failed'}
                      </p>
                    </>
                  )}
                  {result.showResult === 'NO' && ( // Display "Result Pending" if showResult is NO
                    <p className="mt-6 ml-10 rounded-[8px] bg-pink-50 py-[8px] px-[12px] font-medium text-richblack-900"
                       >Result Pending</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserResultHistory;
