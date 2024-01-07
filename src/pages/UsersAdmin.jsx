// App.js
import React from "react";
import Users from "../components/Users";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Menu></Menu>
      <Users />
    </div>
  );
};

export default App;
