import React, { useEffect, useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from './charts/DoughnutChart';
import { useSelector } from 'react-redux';

Chart.register(CategoryScale);

function StockAnalyzComponent() {

  const stock_analyz = useSelector(state => state.commonSlice.stock_analyz);

  const [chartData, setChartData] = useState({
    labels: stock_analyz.map((data) => data.name),
    datasets: [
      {
        data: stock_analyz.map((data) => data.count),
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
      labels: stock_analyz.map((data) => data.name),
      datasets: [
        {
          data: stock_analyz.map((data) => data.count),
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
  }, [stock_analyz])

  return (
    <div className='col-span-3 mr-4 h-[550px] ml-4 border rounded-xl bg-white p-2'>

      <DoughnutChart chartData={chartData} />

    </div>
  )
}

export default StockAnalyzComponent