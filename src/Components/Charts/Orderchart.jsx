import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OrderChart() {
  const [orderStatus, setOrderStatus] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((response) => {
        const carts = response.carts;
        const counts = carts.reduce(
          (acc, cart) => {
            if (cart.totalProducts <= 3) acc.pending += 1;
            else if (cart.totalProducts <= 6) acc.processing += 1;
            else acc.completed += 1;
            return acc;
          },
          { pending: 0, processing: 0, completed: 0 }
        );

        console.log("Dynamic counts from DummyJSON:", counts);
        setOrderStatus(counts);
      })
      .catch((err) => console.error("Error fetching carts:", err));
  }, []);

  const data = {
    labels: ["Pending", "Processing", "Completed"],
    datasets: [
      {
        label: "Orders",
        data: [orderStatus.pending, orderStatus.processing, orderStatus.completed],
        backgroundColor: ["rgb(33, 150, 243)", "#FFC107", "#4CAF50"],
      },
    ],
  };

  const options = {
    responsive: true,
     
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 10, 
          },
          color: "#b2b2b5", 
        },
      },
      title: {
        display: true,
        text: "Orders Status",
        font: {
          size: 18, 
          weight: "bold",
        },
        color: '#7d7c7c', 
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#00aa00", 
        },
        ticks: {
          font: {
            size: 14,
          },
          color: "#b2b2b5",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
         
          font: {
            size: 16,
            weight: "bold",
          },
         
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 14,
          },
          color: "rgba(26, 188, 156, 0.8)", 
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default OrderChart;
