// import React, { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./Myshop.css"; // Import your CSS file

function Myshop() {
  debugger;
  const [shop, setShop] = useState([]);
  const nav=useNavigate();
  const loc = useLocation();
  // var citys = loc.state.city;
  // var pincodes = loc.state.pincode;
  // window.sessionStorage.setItem("pincode",pincodes);
  // window.sessionStorage.setItem("city",citys);
  // window.sessionStorage.setItem("shopname",shop.shopname);
  var citys=window.sessionStorage.getItem("city");
  var pincodes=window.sessionStorage.getItem("pincode");
var handlePageChange=(id)=>{
window.sessionStorage.setItem("shopid",id);
nav("/dashboard");
}
  useEffect(() => {
    var uri = "http://localhost:63464/api/shop";
    var entry = {
      city: citys,
      pincode: pincodes,
    };

    axios
      .post(uri, entry)
      .then((response) => {
        var data = response.data;
        if (Array.isArray(data)) {
          setShop(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  }, [citys, pincodes]);

  return (
    <div>
      <Header />
      <div className="shop-container">
        {shop.map((sp) => (
          <div className="shop-card">
            <table className="shop-table">
              <tbody>
                <tr>
                  <td colSpan="2" className="shop-header">
                    Shop Details
                  </td>
                </tr>
                <tr>
                  <td className="property-label">Shopname:</td>
                  <td>{sp.Shopname}</td>
                </tr>
                <tr>
                  <td className="property-label">Address:</td>
                  <td>{sp.User.address}</td>
                </tr>
                <tr>
                  <td className="property-label">Mobile NO:</td>
                  <td>{sp.User.mobile}</td>
                </tr>
                <tr>
                  <td className="property-label">Pincode:</td>
                  <td>{sp.User.pincode}</td>
                </tr>
                <tr><td colSpan="2"><center><button className="btn btn-primary" onClick={()=>handlePageChange(sp.Id)}>Shop Here</button></center></td></tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myshop;
