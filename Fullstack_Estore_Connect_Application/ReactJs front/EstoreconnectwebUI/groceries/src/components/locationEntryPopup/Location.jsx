import { useState } from "react";
import "./Location.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Location = (props) => {
const[entry,setentry]=useState({city:"",pincode:""});
const nav=useNavigate();


var ontext=(args)=>{
  var copy={...entry}
  copy[args.target.name]=args.target.value;
  setentry(copy);
};
// const handlePageChange=(dt)=>{
//   nav("/Myshop",{state:{city:dt.city,pincode:dt.pincode}});
// }
var Sellersignup=()=>{
  nav("/SellerSignUp");
}
var Searchshop=()=>{
  debugger;
  axios.post("http://localhost:63464/api/shop",entry)
  .then((res)=>{
    if(res.data.length>0)
    {
      debugger;
      window.sessionStorage.setItem("city",entry.city);
      window.sessionStorage.setItem("pincode",entry.pincode);
      nav("/Myshop");
    }
    else
    {
      alert("Sorry we are not serving for your area");
      nav("/");
    }
  });
  
}
  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          <div class="locationContainer">
            <div class="form">
              <div class="login-form">
                <div className="row welcomeTitle">Welcome</div>
                {/* <input type="text" placeholder="username">
                  <option selected disabled>
                    Enter your city
                  </option>
                  <option>Pune</option>
                  <option>Pune</option>
                </input> */}
                <input type="text" name="city" placeholder="Enter Your City" onChange={ontext} value={entry.city} ></input>
                <input type="text" name="pincode"placeholder="Pincode" onChange={ontext} value={entry.pincode} />
                <button onClick={Searchshop}>Submit</button>
                <p class="message">
                  <a className="signupLink" onClick={Sellersignup}>Seller Signup</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Location;
