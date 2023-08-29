import { useState } from "react";
import Header from "../shared/Header/Header";
import "../userSignUp/userSignUp.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerSignUp = () => {
    const nav=useNavigate();
  const [c, setCustomer] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    mobile: "",
    pincode: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const register = () => {
    debugger;
    axios.post("http://localhost:63464/api/CustomerRegistration", c)

      .then((resp) => {
        if (resp.status === 200) {
          alert("Customer Registered Successfully..!!");
        }
      });
      nav("/");
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div class="login-page">
          <div class="form">
            <div class="login-form">
              <div className="row welcomeTitle">Customer Sign Up</div>
              <input
                type="text"
                name="fname"
                value={c.fname}
                placeholder="Firstname"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lname"
                value={c.lname}
                placeholder="Lastname"
                onChange={handleInputChange}
              />
              <textarea
                type="text"
                name="address"
                value={c.address}
                placeholder="Address"
                rows="3"
                onChange={handleInputChange}
              ></textarea>
              <input
                type="email"
                name="email"
                value={c.email}
                placeholder="Email"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="city"
                value={c.city}
                placeholder="City"
                onChange={handleInputChange}
              />
              <input
                type="contact"
                name="mobile"
                value={c.mobile}
                placeholder="Mobile Number"
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="pincode"
                value={c.pincode}
                placeholder="Pincode"
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                value={c.password}
                placeholder="Password"
                onChange={handleInputChange}
              />

              <button onClick={register}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSignUp;
