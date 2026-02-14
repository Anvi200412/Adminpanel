import {Chart as ChartJS, CategoryScale,PointElement, LinearScale, LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { color } from "chart.js/helpers";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProductChart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=9")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      });
  }, [])
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const prices = months.map((_, i) => (products[i] ? products[i].price : 0));

  const data = {
    labels: months,
    datasets: [
      {
        label : "product Overview",
        data: prices,
        borderColor: "rgb(33, 150, 243)",
        Filler:true,
        tension: 0.3,
      },
    ],
  };

  const options = {
     
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color:'#7d7c7c',
        font: {
          size: 25,
          weight: "bold"
        },
        boxWidth: 0,        
        usePointStyle: false
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(26, 188, 156, 0.8)",
        font: {
          size: 14,
          weight: "bold"
        }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "rgba(26, 188, 156, 0.8)",
        font: {
          size: 14,
          weight: "bold"
        }
      }
    }
  }
};

  return <Line data={data} options={options} />;
}

export default ProductChart;

