import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => {
        const ordersWithStatus = data.carts.map((order) => ({
          ...order,
          status: ["Delivered", "Sending", "Pending"][
            Math.floor(Math.random() * 3)
          ],
        }));

        setOrders(ordersWithStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading)
    return (
      <p style={{ padding: "20px", fontSize: "16px", textAlign: "center" }}>
        Loading orders...
      </p>
    );

  return (
    <div className="orders-container">
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Products</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td data-label="Order ID">{order.id}</td>
                  <td data-label="User ID">{order.userId}</td>
                  <td data-label="Products" className="product-list">
                    {order.products.map((p) => (
                      <div key={p.id}>
                        {p.title} (x{p.quantity})
                      </div>
                    ))}
                  </td>
                  <td data-label="Total Quantity">
                    {order.products.reduce((total, p) => total + p.quantity, 0)}
                  </td>
                  <td data-label="Total Price">
                    $
                    {order.products.reduce(
                      (total, p) => total + p.price * p.quantity,
                      0
                    )}
                  </td>
                  <td data-label="Status">
                    <select
                      className={`status ${order.status.toLowerCase()}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Sending">Sending</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
