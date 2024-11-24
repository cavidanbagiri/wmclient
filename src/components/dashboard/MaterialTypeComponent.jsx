import React, { useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import LineChart from './charts/LineChart';

Chart.register(CategoryScale);

function MaterialTypeComponent() {

    const Data = [
        {
            id: 1,
            year: 'Warehouse',
            userGain: 8000,
            userLost: 823
        },
        {
            id: 2,
            year: 'Stock',
            userGain: 4567,
            userLost: 345
        },
        {
            id: 3,
            year: 'Area',
            userGain: 7888,
            userLost: 555
        },
        {
            id: 4,
            year: 'Unusable',
            userGain: 9000,
            userLost: 4555
        },
        {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
        },
        
    ];

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgb(139 92 246)",
                    "rgb(20,184,166)",
                    "rgb(14,165,233)",
                    "rgb(99,102,241)",
                    "rgb(168,85,247)",
                ],
                borderColor: "indigo",
                borderWidth: 2
            }
        ]
    });

    return (
        <div className='col-span-5 h-[550px]  border rounded-xl bg-white p-2'>
            <LineChart chartData={chartData} />
        </div>
    )
}

export default MaterialTypeComponent