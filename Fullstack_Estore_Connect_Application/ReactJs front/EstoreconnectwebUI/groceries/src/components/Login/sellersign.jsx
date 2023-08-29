import "./Login.css";
import React, { useState, useEffect } from "react";


import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import UserSignUp from "../userSignUp/UserSignUp";
import axios, { Axios } from "axios";
import { FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-use-history";
import { useNavigate } from "react-router-dom";
const Sellersign = (props) => {
  const [isUserRegister, setIsUserRegister] = useState(false);
  const [isSellerRegister, setIsSellerRegister] = useState(false);
  const nav=useNavigate();
  const toggleUserRegister = () => {
    setIsUserRegister(!isUserRegister);
  };
  const toggleSellerRegister = () => {
    nav("/SellerSignUp");
  };





const [credential,setcredential]=new useState({Username:"",password:""});
const[user,setuser]=new useState([])
const[message,setmsg]=new useState("");
const history=useHistory();
var ontext=(args)=>{
  var copy={...credential}
  copy[args.target.name]=args.target.value;
  setcredential(copy);
};
const validatelogin=()=>{
 
  axios.post("http://localhost:63464/api/SellerLogin",credential)
  .then((response)=>{var data=response.data;
    if(response.status==200)
    {
       window.sessionStorage.setItem("isUserLoggedIn",true);
      window.sessionStorage.setItem("userid",data.Id);
      window.sessionStorage.setItem("email",data.email);
      window.sessionStorage.setItem("shopid",data.Id);
      alert("Login Sucessfully..!!");
        history.push("/Sellerdashboard")
      
      
      
    }
    else{
      setmsg("Invalid Credential!!");
      setTimeout(() => {
        setmsg("");
      }, 5000);
    }
})
  
  .catch((error)=>{console.log(error)})
};

 
  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>

          <div className="login-container">
            <div class="login-page">
              <div class="form">
                <div class="login-form">
                  <div className="row welcomeTitle">Seller Login</div>
                  <input type="text" placeholder="username" name="Username" value={credential.Username} onChange={ontext} />
                  <input type="password" placeholder="password" name="password" value={credential.password} onChange={ontext}/>
                  <button onClick={validatelogin}>Login</button>
                  <p class="message">
                    {/* <a className="signupLink" onClick={toggleUserRegister}>
                      UserSignup
                    </a> */}
                    <a className="signupLink" onClick={toggleSellerRegister}>
                      SellerSignup
                    </a><br/><br/>
                    {/* <a className="signupLink" onClick={toggleSellersignin}>
                      SellerSignIn
                    </a> */}
                  </p>
                  <p class="invalid">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUserRegister && <UserSignUp handleClose={toggleUserRegister} />}
      {isSellerRegister && (
        <UserSignUp handleClose={toggleSellerRegister} isSeller={true} />
      )}
    </>
  );
};

export default Sellersign;
