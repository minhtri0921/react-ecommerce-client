// App.js
import React from "react";
import OrdersTable from "../components/Orders";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

const OrdersAdmin = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Menu></Menu>
      <OrdersTable />
    </div>
  );
};

export default OrdersAdmin;
