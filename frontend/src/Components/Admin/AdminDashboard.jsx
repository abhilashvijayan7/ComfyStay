/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart from chart.js/auto

function AdminDashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        // Destroy the previous chart instance if it exists
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Users', 'Total Revenue', 'Total Bookings', 'Total Properties'],
          datasets: [
            {
              label: 'Statistics',
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.8)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: [30, 4000, 78, 89],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend (if needed)
            },
          },
        },
      });

      // Save the new chart instance in the ref for future destruction
      chartInstanceRef.current = newChartInstance;
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
    <div className="py-4 w-full bg-[#0e0e0e]">
         <header>
             <div className="flex items-center justify-center sm:justify-start">
                 <p className="text-white px-4 sm:px-12 text-xl sm:text-2xl font-serif">
                     Dashboard
                 </p>
             </div>
         </header>
     </div>
     <canvas ref={chartRef}></canvas>
</div>





  );
}

export default AdminDashboard;
