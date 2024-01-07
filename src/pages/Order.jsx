// ShippingOrdersPage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const ShippingOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("currentUser"));

    async function getOrder() {
      try {
        const responseOrder = await axios.get(
          `https://wm-shop-be.onrender.com/api/v1/customer/orders/list/${userLocal.data.userId}`
        );
        const orderData = responseOrder.data.data;
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    getOrder();
  }, []);

  const styles = {
    productImage: {
      maxWidth: "50px", // Adjust as needed
      marginRight: "5px",
    },
    productList: {
      marginTop: "10px",
    },
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Your Orders</h2>
        <div className="row mt-3">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.id}</h5>
                  <p className="card-text">
                    <strong>Order Status:</strong> {order.orderStatusName}
                  </p>
                  <p className="card-text">
                    <strong>Total Price:</strong> ${order.totalPriceOrder}
                  </p>
                  <p className="card-text">
                    <strong>Delivery Name:</strong> {order.deliveryName}
                  </p>
                  <p className="card-text">
                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </p>
                  <p className="card-text">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Delivery Date:</strong>{" "}
                    {new Date(order.deliveryDate).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Payment Method:</strong> {order.paymentName}
                  </p>
                  <p className="card-text">
                    <strong>Payment Status:</strong> {order.paidStatus}
                  </p>
                  <div style={styles.productList}>
                    <strong>Products:</strong>{" "}
                    {order.productsList.map((product) => (
                      <span key={product.productId}>
                        <img
                          src={product.productImage}
                          alt={product.name}
                          style={styles.productImage}
                        />
                        {product.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShippingOrdersPage;
