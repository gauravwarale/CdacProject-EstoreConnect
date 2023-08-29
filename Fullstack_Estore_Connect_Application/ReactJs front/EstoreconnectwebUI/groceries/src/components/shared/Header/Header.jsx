import Login from "../../Login/Login";
import Cart from "../../Cart/Cart";
import React, { useState } from "react";
import { Popover, PopoverHeader, PopoverBody } from "react-bootstrap";
import "../Header/Header.css";
import userImg from "../../../assets/icons/user.png";
import UserSignUp from "../../userSignUp/UserSignUp";
import cartimg from '../../../assets/icons/cart.png';
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfilePopover, setProfilePopover] = useState(false);
  const [isUserRegister, setIsUserRegister] = useState(false);
  const nav=useNavigate();

  const toggleUserRegister = () => {
    nav("/updateprofile");
  };
  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleCartPopup = () => {
    // setIsCartOpen(!isCartOpen);
    navigate("/cart");
  };

  const toggleProfilePopover = () => {
    setProfilePopover(!isProfilePopover);
  };

  const toMyOrdersPage = () => {
    navigate("/myOrders");
  };

  const togglechangepass=()=>{
    nav("/changepass");
  }

  const Logout=()=>{
    window.sessionStorage.clear();
    nav("/");
  }
  return (
    <>
      {/* header */}
      <nav className="row navbar navbar-expand-sm navbar-toggleable-sm  border-bottom box-shadow">
        <div className="container">
          <a
            className="navbar-brand"
            asp-area=""
            asp-controller="Home"
            asp-action="Index"
          >
            EstoreConnect Digital Nexus
          </a>

          <div className="col-md-5">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse">
              <span class="mr-3 ShopNameMargin">{window.sessionStorage.getItem("shopname")}</span>
              <select placeholder="address" className="addDropdown">
                <option disabled>Address</option>
                <option>{window.sessionStorage.getItem("city")},{window.sessionStorage.getItem("pincode")}</option>
              </select>
              <div className="form-inline my-2 my-lg-0">
                <div className="input-group" style={{paddingLeft:10}}>
                  <input
                    type="text"
                    name="keyword"
                    className="form-control"
                    placeholder="Keyword to seach"
                  />
                  <div className="input-group-append">
                    <button className="btn " type="button">
                      <i className="fa fa-search">Go</i>
                    </button>
                  </div>
                  <button
                    className="btn text-white"
                    id="loginBtn"
                    onClick={toggleProfilePopover}
                  >
                    <img className="userIcon" src={userImg} />
                  </button>
                  <button className="btn text-white" onClick={toggleLoginPopup}>
                    Login
                  </button>
                  <button className="btn text-white" onClick={toggleCartPopup}>
                    {/* <img className="cartImg" src={cartImg} />  */}
                    <img src={cartimg} style={{height:20,width:20}}></img>
                    Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isProfilePopover && (
        <Popover placement="bottom" target="loginBtn">
          <PopoverHeader>My Account</PopoverHeader>
          <PopoverBody>
            <div className="row">
              <button className=" btn">Email-{window.sessionStorage.getItem("email")}</button>
            </div>
            <div className="row">
              <button className=" btn" onClick={toMyOrdersPage}>
                My Orders
              </button>
            </div>
            <div className="row">
              <button className=" btn" onClick={toggleUserRegister}>
                Update Profile
              </button>
            </div>
            <div className="row">
              <button className=" btn" onClick={togglechangepass}>
                Change password
              </button>
            </div>
            <div className="row">
              <button className=" btn" onClick={Logout}>logout</button>
            </div>
          </PopoverBody>
        </Popover>
      )}

      {isLoginOpen && <Login handleClose={toggleLoginPopup} />}
      {isCartOpen && <Cart handleClose={toggleCartPopup} />}
      {isUserRegister && <UserSignUp handleClose={toggleUserRegister} />}
    </>
  );
}
