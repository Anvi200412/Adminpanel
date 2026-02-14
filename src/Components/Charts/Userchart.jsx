import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

  // Get CSS variables for theme and accents
  const themeText = getComputedStyle(document.documentElement).getPropertyValue("--text-main").trim();
  const accentUsers = getComputedStyle(document.documentElement).getPropertyValue("--accent-users").trim();
  const accentProducts = getComputedStyle(document.documentElement).getPropertyValue("--accent-products").trim();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Users",
        data: totalPerMonth,
        backgroundColor: accentUsers || "rgba(26, 188, 156, 0.8)", // green
        borderRadius: 6,
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
      {
        label: "Active Users",
        data: activePerMonth,
        backgroundColor: accentProducts || "rgba(52, 152, 219, 0.8)", // blue
        borderRadius: 6,
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // critical for filling container height
    plugins: {
      legend: {
        position: "top",
        labels: { color: themeText },
      },
      tooltip: {
        bodyColor: themeText,
        titleColor: themeText,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: accentProducts || "rgba(52, 152, 219, 0.8)" },
        grid: { color: "rgba(150,150,150,0.2)" },
      },
      x: {
        ticks: { color: accentUsers || "rgba(26, 188, 156, 0.8)" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="chart-card">
      <h2 className="chart-title">Monthly Users</h2>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default UserMonthlyBarChart;
