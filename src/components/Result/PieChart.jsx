import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getResultByQuizName } from "../../services/operations/Result";

function Piechart({ quiz }) {
  const [passFailData, setPassFailData] = useState([]);
  const [labels, setLabels] = useState(["Passed", "Failed"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getResultByQuizName(quiz);
        let passCount = 0;
        let failCount = 0;

        resData.forEach(result => {
          if (result.passed === "yes") {
            passCount++;
          } else {
            failCount++;
          }
        });

        setPassFailData([passCount, failCount]);
      } catch (error) {
        console.error("Error fetching results by quiz name:", error);
      }
    };

    fetchData();
  }, [quiz]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Quiz Result Piechart</h3>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Chart
          type="pie"
          width={500}
          height={350}
          series={passFailData}
          options={{
            title: { text: "Passed vs Failed" },
            noData: { text: "Empty Data" },
            labels: labels
          }}
        />
      </div>
    </div>
  );
}

export default Piechart;
