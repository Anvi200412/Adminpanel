import { useEffect, useState } from "react";
import { FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";
import "./Dashboard.css";

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
        <div className="card card-users">
          <div className="card-content">
            <div>
              <h3>Total Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="card-icon"><FaUsers /></div>
          </div>
        </div>

        <div className="card card-products">
          <div className="card-content">
            <div>
              <h3>Total Products</h3>
              <p>{productsCount}</p>
            </div>
            <div className="card-icon"><FaBox /></div>
          </div>
        </div>

        <div className="card card-orders">
          <div className="card-content">
            <div>
              <h3>Total Orders</h3>
              <p>{ordersCount}</p>
            </div>
            <div className="card-icon"><FaShoppingCart /></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-card">
          <h3>Active Users</h3>
          <UserChart total={usersCount} />
        </div>

        <div className="chart-card">
          <h3>Product Inventory</h3>
          <ProductChart total={productsCount} />
        </div>

        <div className="chart-card">
          <h3>Orders</h3>
          <OrderChart />
        </div>

        <div className="chart-card">
          <h3>Category Breakdown</h3>
          <CategoryChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
