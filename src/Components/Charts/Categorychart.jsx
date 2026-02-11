import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((allCategories) => {
        const top8 = allCategories.slice(0, 8); // get only 10 categories
        setCategories(top8);

        // Create random data for example
        const values = top8.map(() => Math.floor(Math.random() * 50) + 10);

        setData({
          labels: top8.map((c) => c.name),
          datasets: [
            {
              data: values,
              
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#FF9F40",
                "#9966FF",
                "#00A8CC",
                "#FF6B6B",
                "#8E44AD",
                "#2ECC71",
              ],
            },
          ],
        });
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return <Pie data={data} />;
}

export default CategoryChart;
