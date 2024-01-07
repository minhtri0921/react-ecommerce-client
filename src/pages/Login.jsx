import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      email,
      password
    }

    if (localStorage.getItem('currentUser')) {
      navigate('/');
    } else {
      try {
        var result = await axios({
          method: "POST",
          url: "https://wm-shop-be.onrender.com/api/v1/auth/login",
          data: formData
        })

        //success
        localStorage.setItem('currentUser', JSON.stringify(result.data));
        // chuyển hướng sang Home khi đăng nhập thành công
        if (result.data.username === 'admin') {
          navigate('/admin');
          toast.success("Đăng nhập thành công");
        } else {
          navigate('/');
          toast.success("Đăng nhập thành công");
        }
        console.log(result);
      } catch (err) {
        console.log('Error : ' + err)
        setErr('Login Failed')
        toast.error("Đăng nhập thất bại");
      }
    }

  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input style={{backgroundColor: 'red'}}
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                  Login
                </button>
                <p>{err}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
