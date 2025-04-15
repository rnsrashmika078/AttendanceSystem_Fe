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

const MyBarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Sales",
        data: [20, 50, 40, 6],
        backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
        borderColor: "rgba(255,0,0,1)",
        borderWidth: 1,
      },
      {
        label: "Sales",
        data: [30, 60, 70, 10],
        backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
      },
      {
        label: "Sales",
        data: [20, 30, 10, 30],
        backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
      },
    ],
  };

  const options = {
    responsive: true,
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
    <div>
      <div className="border-2 hover:text-2xl">
        <Bar
          data={data}
          options={{ ...options, scales: { y: { beginAtZero: true } } }}
        />
      </div>
      <div className="border-2 hover">
        <Line
          data={data}
          options={{ ...options, elements:{point:{radius:3}} }}
        />
      </div>
      <div>
        <Doughnut data={data} />
      </div>
      <div className="border-2 hover:text-2xl">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default MyBarChart;
