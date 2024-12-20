import React, { useEffect, useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from './charts/BarChart';
import { useSelector } from 'react-redux';

Chart.register(CategoryScale);

function GroupChartComponent() {

  const group_chart_analyz = useSelector(state => state.commonSlice.group_chart_analyz);

  const [chartData, setChartData] = useState({
    labels: group_chart_analyz.map((data) => data.group_name),
    datasets: [
      {
        data: group_chart_analyz.map((data) => Number(data.sum)),
        backgroundColor: [
          "rgb(139 92 246)",
          "rgb(20,184,166)",
          "rgb(14,165,233)",
          "rgb(99,102,241)",
          "rgb(168,85,247)",
          "rgb(139 92 246)",
          "rgb(20,184,166)",
          "rgb(14,165,233)",
          "rgb(99,102,241)",
          "rgb(168,85,247)",
          "rgb(139 92 246)",
          "rgb(20,184,166)",
          "rgb(14,165,233)",
          "rgb(99,102,241)",
          "rgb(168,85,247)",
        ],
        borderColor: "black",
        borderWidth: 0
      }
    ]
  });


  useEffect(() => {
    setChartData({
      labels: group_chart_analyz.map((data) => data.group_name),
      datasets: [
        {
          data: group_chart_analyz.map((data) => Number(data.sum)),
          backgroundColor: [
            "rgb(139 92 246)",
            "rgb(20,184,166)",
            "rgb(14,165,233)",
            "rgb(99,102,241)",
            "rgb(168,85,247)",
            "rgb(139 92 246)",
            "rgb(20,184,166)",
            "rgb(14,165,233)",
            "rgb(99,102,241)",
            "rgb(168,85,247)",
            "rgb(139 92 246)",
            "rgb(20,184,166)",
            "rgb(14,165,233)",
            "rgb(99,102,241)",
            "rgb(168,85,247)",
          ],
          borderColor: "black",
          borderWidth: 0
        }
      ]
    })
  }, [group_chart_analyz])

  return (
    <div className='col-span-6 mr-4 h-[550px] ml-4 border rounded-xl bg-white p-2'>

      <BarChart chartData={chartData} />

    </div>
  )
}

export default GroupChartComponent