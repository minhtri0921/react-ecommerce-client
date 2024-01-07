import { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = () => {
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    async function getListOrders() {
      try {
        const response = await axios(
          "https://wm-shop-be.onrender.com/api/v1/managers/orders"
        );
        const data = response.data.data;
        setListOrders(data);
      } catch (err) {
        console.log("Error : " + err);
      }
    }
    getListOrders();
  }, []);
  // const deleteorders = (id) => {
  //   console.log(id);
  //   async function deleteData() {
  //     await axios.delete(`http://localhost:3001/users/${id}`);
  //   }
  //   deleteData();
  // };
  return (
    <div className="table-container">
      <style>
        {`
            .table-container {
              margin-top: 20px;
            }
  
            .table-container h2 {
              color: #333;
              margin-bottom: 10px;
            }
  
            table {
              width: 80%;
              border-collapse: collapse;
              margin-top: 10px;
              margin-left : 200px;
            }
  
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
  
            th {
              background-color: #f2f2f2;
              padding-right: 20px;
              position: relative;
              z-index: 1;
            }
          `}
      </style>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Name Product</th>
            <th>Delivery Address</th>
            <th>Order Status Name</th>
            <th>Payment Name</th>
            <th>Paid Status</th>
            <th>Product Image</th>
            <th>Quantity</th>
            <th>Total Price Order</th>
          </tr>
        </thead>
        <tbody>
          {listOrders.map((orders) => (
            <tr key={orders.id}>
              <td>{orders.id}</td>
              <td>{orders.customerName}</td>
              <td>
                {orders.productsList.map((product) => (
                  <div key={product.productId}>
                    <p>{product.name}</p>
                  </div>
                ))}
              </td>
              <td>{orders.deliveryAddress}</td>
              <td>{orders.orderStatusName}</td>
              <td>{orders.paymentName}</td>
              <td>{orders.paidStatus}</td>
              <td>
                {orders.productsList.map((product) => (
                  <div key={product.productId}>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
              </td>
              <td>
                {orders.productsList.map((product) => (
                  <div key={product.productId}>
                    <img
                      src={product.productImage}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                ))}
              </td>
              <td>{orders.totalPriceOrder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
