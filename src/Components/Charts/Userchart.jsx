import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

function UserMonthlyBarChart() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.total))
      .catch((err) => console.error(err));
  }, []);

  
  const totalPerMonth = [30, 25, 35, 28, 32, 26, 32];
  const activePerMonth = [20, 15, 22, 18, 20, 16, 19];


  const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Total Users",
      data: totalPerMonth,
      backgroundColor: "rgba(26, 188, 156, 0.8)", 
      borderRadius: 6,
      barPercentage: 0.45,
      categoryPercentage: 0.6,
    },
    {
      label: "Active Users",
      data: activePerMonth,
      backgroundColor: "rgba(52, 152, 219, 0.8)", 
      borderRadius: 6,
      barPercentage: 0.45,
      categoryPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
    maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: "Inter, sans-serif",
          size: 14,
          weight: "500",
        },
        color: "#2c2b2b", 
      },
    },
    title: {
      display: true,
      text: `Users Overview`,
      font: {
        family: "Inter, sans-serif",
        size: 30,
        weight: "700",
      },
      color: "#fdf8f8", 
      padding: { top: 10, bottom: 20 },
    },
    tooltip: {
      bodyFont: {
        family: "Inter, sans-serif",
        size: 13,
        weight: "400",
      },
      titleFont: {
        family: "Inter, sans-serif",
        size: 14,
        weight: "600",
      },
      bodyColor: "#ffffff",  
      titleColor: "#e7e0e0", 
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          family: "Inter, sans-serif",
          size: 12,
          weight: "400",
        },
        color: "rgba(52, 152, 219, 0.8)", 
      },
      grid: {
        color: "rgba(255,255,255,0.2)", 
      },
    },
    x: {
      ticks: {
        font: {
          family: "Inter, sans-serif",
          size: 12,
          weight: "500",
        },
        color: "rgba(52, 152, 219, 0.8)", 
      },
      grid: {
        display: false,
      },
    },
  },
};

  return (
    <div
      style={{
        height: "400px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default UserMonthlyBarChart;
