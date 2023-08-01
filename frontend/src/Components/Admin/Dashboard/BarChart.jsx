/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
function BarChart({ revenueDetails }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "weekly revenue",
      },
    },
  };
  for (let i = 1; i <= 7; i++) {
    let exists = false;
    revenueDetails.forEach((data) => {
      if (i === data.day) {
        exists = true;
        return
      }
    });

    if (!exists) {
      revenueDetails.push({ total: 0, day: i });
    }
  }
  const revenue= revenueDetails.sort((a,b)=>a.day-b.day)

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "revenue",
        data: revenue?.map((revenue)=>revenue.total*.3),
        backgroundColor: "rgb(205, 235, 255)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default BarChart;