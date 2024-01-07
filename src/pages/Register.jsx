import React, { useState } from 'react';
import { Navbar } from '../components';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from "react-toastify";

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            firstName:fullName,
            email,
            password,
            roleId:1,
            address:'Da Nang',
            phone:'1234567890',
            lastName:'Le'
        }

        try {
            await axios({
                method: "POST",
                url: "https://wm-shop-be.onrender.com/api/v1/auth/signup",
                data: formData,
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            });
            navigate('/login');
            toast.success("Đăng kí thành công")
        } catch (err) {
            console.log('Lỗi : ' + err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    value={fullName}
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    value={email}
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>
                                    Already has an account?{' '}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>{' '}
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
