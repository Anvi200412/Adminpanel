import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then(() => {
        // Custom category names you want to display instead of API names
        const customCategories = [
          "Groceries",
          "Category",
          "Men's Watch",
          "Women's Clothes",
          "Electronics",
        ];

        // Generate random values for these 5 categories
        const values = customCategories.map(() =>
          Math.floor(Math.random() * 50) + 10
        );

        setData({
          labels: customCategories, // Use your custom names here
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#FF9F40",
              ],
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        });
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div
      style={{
        background: "#3e546a",
        borderRadius: 18,
        padding: 20,
        maxWidth: 350,
        margin: "30px auto",
        color: "#7d7c7c",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 22 }}>Category Breakdown</h2>
      <div style={{ width: 300, height: 300, margin: "0 auto" }}>
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  color: "#848383",
                  font: { size: 14 },
                },
              },
              tooltip: {
                enabled: true,
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default CategoryChart;
