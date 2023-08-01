/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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
  // Ensure ChartJS plugins are registered only once
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
        text: "Weekly Revenue",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: ₹ ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  // Prepare labels for each day of the week
  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Create an array to hold revenue data for each day of the week
  const revenueData = labels.map((day, index) => {
    // Find the revenue data for the corresponding day (if available)
    const dataForDay = revenueDetails.find((data) => data._id === index + 1);
    // Calculate the revenue for that day or set it to 0 if not available
    return dataForDay ? dataForDay.total * 0.3 : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: "rgb(205, 235, 255)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;
