import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.carts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading orders...</p>;

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Products</th>
              <th>Total Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td className="product-list">
                  {order.products.map((p) => (
                    <div key={p.id}>
                      {p.title} (x{p.quantity})
                    </div>
                  ))}
                </td>
                <td>
                  {order.products.reduce((total, p) => total + p.quantity, 0)}
                </td>
                <td>
                  $
                  {order.products.reduce(
                    (total, p) => total + p.price * p.quantity,
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;

