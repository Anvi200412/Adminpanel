import { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";

import UserChart from "../Components/Charts/Userchart";
import ProductChart from "../Components/Charts/Productchart";
import OrderChart from "../Components/Charts/Orderchart";
import CategoryChart from "../Components/Charts/Categorychart";

function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsersCount(data.total));

    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductsCount(data.total));

    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => setOrdersCount(data.total));
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <div className="card-content">
            <div>
              <h3>Total Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="card-icon" style={{ color: "#1abc9c" }}>
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div>
              <h3>Total Products</h3>
              <p>{productsCount}</p>
            </div>
            <div className="card-icon" style={{ color: "#3498db" }}>
              <FaBox />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div>
              <h3>Total Orders</h3>
              <p>{ordersCount}</p>
            </div>
            <div className="card-icon" style={{ color: "#f39c12" }}>
              <FaShoppingCart />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
   <div className="charts">
  <div className="chart-card chart-users">
    <h3 style={{ color: "#0b0b0b" }}>Active Users</h3>
    <UserChart total={usersCount} />
  </div>

  <div className="chart-card chart-products">
    <h3 style={{ color: "#0b0b0b" }}>Product Inventory</h3>
    <ProductChart total={productsCount} />
  </div>

  <div className="chart-card chart-orders">
    <h3 style={{ color: "#0b0b0b" }}>Orders</h3>
    <OrderChart />
  </div>

  <div className="chart-card chart-categories">
    <h3 style={{ color: "#0b0b0b" }}>Category Breakdown</h3>
    <CategoryChart />
  </div>
</div>

    </div>
  );
}

export default Dashboard;
