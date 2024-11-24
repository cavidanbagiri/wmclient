import React, { useEffect, useState } from 'react'


import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from './charts/PieChart';
import { useSelector } from 'react-redux';

Chart.register(CategoryScale);

function STFAnalyzComponent() {

  const type_count = useSelector(state => state.commonSlice.type_count);

  const [chartData, setChartData] = useState({
    labels: type_count?.map((data) => data.type),
    datasets: [
      {
        data: type_count?.map((data) => data.count),
        backgroundColor: [
          "rgb(139 92 246)",
          "rgb(20,184,166)",
          "rgb(14,165,233)",
          "rgb(99,102,241)",
          "rgb(168,85,247)"
        ],
        borderColor: "black",
        borderWidth: 0
      }
    ]
  });

  useEffect(() => {
    setChartData({
      labels: type_count?.map((data) => data.type),
      datasets: [
        {
          data: type_count?.map((data) => data.count),
          backgroundColor: [
            "rgb(139 92 246)",
            "rgb(20,184,166)",
            "rgb(14,165,233)",
            "rgb(99,102,241)",
            "rgb(168,85,247)"
          ],
          borderColor: "black",
          borderWidth: 0
        }
      ]
    })
  }, [type_count])

  return (
    <div className='col-span-3 mr-4 h-[550px] ml-4 border rounded-xl bg-white p-2'>

      <PieChart chartData={chartData} />

    </div>
  )
}

export default STFAnalyzComponent