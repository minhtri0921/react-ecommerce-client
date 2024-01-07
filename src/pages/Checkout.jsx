import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [productOrder, setProductOrder] = useState([]);
  const [price, setPrice] = useState();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLocal = JSON.parse(localStorage.getItem("currentUser"));

        const [cartResponse, userResponse] = await Promise.all([
          axios.get(
            `https://wm-shop-be.onrender.com/api/v1/customer/carts?customerId=${userLocal.data.userId}`
          ),
          axios.get(
            `https://wm-shop-be.onrender.com/api/v1/customer/profiles/${userLocal.data.userId}`
          ),
        ]);

        setProductOrder(cartResponse.data.data);
        setUser(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userLocal = JSON.parse(localStorage.getItem("currentUser"));

    const formData = {
      customerId: userLocal.data.userId,
      deliveryName: user.lastName,
      deliveryAddress: user.address,
      deliveryPhone: user.phone,
      orderDate: Date.now(),
      deliveryDate: Date.now(),
      totalPrice: price,
      paymentMethodId: 1,
    };

    try {
      await axios.post(
        "https://wm-shop-be.onrender.com/api/v1/customer/orders",
        formData
      );

      // After successfully submitting the form, navigate to the /order page
      navigate("/order");
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    productOrder.forEach((item) => {
      subtotal += item.unitPrice * item.quantity;
      totalItems += item.quantity;
    });

    setPrice(subtotal + shipping);

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})
                    <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate
                >
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value={user.firstName || ""}
                        readOnly
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        required
                        value={user.lastName || ""}
                        readOnly
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                        value={user.address || ""}
                        readOnly
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="phonenumber" className="form-label">
                        Phone Number
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phonenumber"
                        placeholder="Apartment or suite"
                        value={user.phone || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button className="w-100 btn btn-primary" type="submit">
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {productOrder.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Checkout;
