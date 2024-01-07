// UserTable.js
import axios from "axios";
import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios("https://wm-shop-be.onrender.com/api/v1/managers/users");
        const data = response.data.data;
        setUsers(data);
      } catch (err) {
        console.log("Error : " + err);
      }
    }
    getUsers();
  }, []);
  const deleteUser = (id) => {
    console.log(id);
    async function deleteData() {
      await axios.delete(`http://localhost:3001/users/${id}`);
    }
    deleteData();
  };
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
            <th>Email</th>
            <th>Password</th>
            <th>Username</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.lastName + user.firstName}</td>
              <td>{user.address}</td>
              <td>
                <button style={{color:"red"}} onClick={()=>deleteUser(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
