// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="flex flex-col justify-between items-center w-full ">
      <h2 className='text-center font-bold text-3xl mb-3'>Malzeme Tipi Analizi</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;