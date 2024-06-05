import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getResultByQuizName } from "../../services/operations/Result";

function LineChart({ quiz }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getResultByQuizName(quiz);

        // Extract points and achieved values from the response data
        const data = resData.map(result => ({
            x: parseInt(result.points), // Parse points as integer
            y: parseInt(result.achived)
        }));

        setChartData(data);
      } catch (error) {
        console.error("Error fetching results by quiz name:", error);
      }
    };

    fetchData();
  }, [quiz]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Quiz Result Line Chart</h3>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Chart
          type="line"
          width={500}
          height={350}
          series={[{ data: chartData }]}
          options={{
            chart: {
              zoom: {
                enabled: false
              }
            },
            xaxis: {
              title: {
                text: "Points"
              }
            },
            yaxis: {
              title: {
                text: "Achieved"
              }
            },
            title: { text: "Points vs Achieved" },
            noData: { text: "Empty Data" }
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
