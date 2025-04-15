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

const LineChart = () => {
  return (
    <div className="relative">
      <div className=" bg-[rgb(var(--icon-bg-color))] p-4 place-items-start rounded-xl">
        <p className="text-[rgb(var(--card-text-color-1))] text-xl font-bold py-1 mb-3 ">
          Attendance History -{" "}
          {new Date().toLocaleString("default", { month: "long" })}
        </p>

        <div className="h-50 w-full">
          <Line
            data={chartData}
            options={{ ...chartOptions, elements: { point: { radius: 3 } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Sales",
      data: [20, 50, 40, 6],
      backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
      borderColor: "rgba(255,0,0,1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: false },
  },
  elements: {
    point: { radius: 5, hoverRadius: 10 },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) =>
          `Month: ${context.label} | Sales: ${context.parsed.y}`,
      },
    },
  },
};
