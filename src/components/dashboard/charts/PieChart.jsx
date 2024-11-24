import React from 'react'
import { Pie , Doughnut } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="flex flex-col justify-between items-center w-full ">
      <h2 className='text-center font-bold text-3xl mb-2'>STF Analizi</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  )
}

export default PieChart