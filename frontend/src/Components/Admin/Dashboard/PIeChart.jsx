/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function PIeChart({ bookingDetails }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const status = [ "active", "completed", "cancelled"];
  status.forEach((status) => {
    let exists = false;
    bookingDetails.forEach((detail) => {
      detail?._id === status && (exists = true);
      if (exists) return;
    });

    if (!exists) {
      bookingDetails.push({ _id: status, total: 0 });
    }
  });

  const data = {
    labels: bookingDetails?.map((data) => {
      return data._id;
    }),
    datasets: [
      {
        data: bookingDetails?.map((data) => {
          return data.count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Set options to control the chart appearance, including height and width
  const options = {
    responsive: true,
    maintainAspectRatio: false, // This ensures height and width props are respected
    // other chart options if needed
  };

  return <Pie data={data} options={options} />;
}

export default PIeChart;
