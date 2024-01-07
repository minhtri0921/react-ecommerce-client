// Menu.js
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div style={{ position: "fixed", top: "90px", left: "0", bottom: "0", width: "150px", backgroundColor: "#333" }}>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                <Link to="/admin/users" style={linkStyle}>Users</Link>
                <Link to="/admin" style={linkStyle}>Products</Link>
                <Link to="/admin/orders" style={linkStyle}>Orders</Link>
            </div>
        </div>
    );
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    marginBottom: "5px",
    borderBottom: "1px solid #555",
};

export default Menu;
