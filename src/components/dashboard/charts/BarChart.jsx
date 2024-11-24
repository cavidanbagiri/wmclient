

import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="flex flex-col justify-between items-center  w-full h-full p-2">
      <h2 className='text-center font-bold text-3xl'>Gruplar Uzere Siparisi Analyz</h2>
      <Bar
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
};