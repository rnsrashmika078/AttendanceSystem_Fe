import React from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  ArcElement,
  plugins,
  Tooltip,
} from "chart.js";
import { plugin } from "postcss";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip
);

const BarChart = () => {
  const data = {
    labels: ["SE", "SVQA", "VAPT", "P-VAPT"],
    datasets: [
      {
        label: "Sales 1",
        data: [20, 100, 40, 6],
        backgroundColor: "rgba(32,242,10,0.5)",
        barThickness: 30,
        categoryPercentage: 1,
        barPercentage: 1,
        borderRadius: 20,
      },
      // {
      //   label: "Sales 2",
      //   data: [30, 60, 70, 10],
      //   backgroundColor: "#60a5fa",
      //   barThickness: 30,
      //   categoryPercentage: 1,
      //   barPercentage: 1,
      // },
      // {
      //   label: "Sales 3",
      //   data: [20, 30, 10, 30],
      //   backgroundColor: "#facc15",
      //   barThickness: 30,
      //   categoryPercentage: 1,
      //   barPercentage: 1,
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 10,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label;
            const value = context.parsed.y;
            return `Month: ${label} | Sales: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative">
      <div className=" bg-[rgb(var(--icon-bg-color))] w-full p-4 place-items-start rounded-xl">
        <p className="text-[rgb(var(--card-text-color-1))] text-xl font-bold py-1 mb-3 ">
          Low Attendance Subject
        </p>

        <div className="h-120 w-full">
          <Bar
            data={data}
            options={{ ...options, scales: { y: { beginAtZero: true } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
