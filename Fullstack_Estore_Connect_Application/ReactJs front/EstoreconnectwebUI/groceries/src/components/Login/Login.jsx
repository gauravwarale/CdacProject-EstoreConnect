import "./Login.css";
import React, { useState, useEffect } from "react";


import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import UserSignUp from "../userSignUp/UserSignUp";
import axios, { Axios } from "axios";
import { FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-use-history";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  debugger;
  const [isUserRegister, setIsUserRegister] = useState(false);
  const [isSellerRegister, setIsSellerRegister] = useState(false);
  const nav=useNavigate();
  const toggleUserRegister = () => {
    nav("/CustomerSignUp");
  };
  const toggleSellerRegister = () => {
    nav("/SellerSignup");
    
  };

var toggleSellersignin=()=>{
    nav("/Sellersign");
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
  debugger;
  axios.post("http://localhost:63464/api/CustomerLogin",credential)
  .then((response)=>{var data=response.data;
    if(data!=401)
    {
      window.sessionStorage.setItem("userid",data.ID);
      window.sessionStorage.setItem("cartid",data.CartID);
      window.sessionStorage.setItem("email",data.email);
      window.sessionStorage.setItem("isUserLoggedIn",true);
      
      if(data.usertype=="CUSTOMER")
      {
        alert("Login Sucessfully..!!");
        history.push("/");
      }
      else if(data.usertype=="USER"){
        history.push("/sellerdashbord")
      }
      
    }
    else{
      setmsg("Invalid Credential!!");
      setTimeout(() => {
        setmsg("");
      }, 5000);
    }})
  
  .catch((error)=>{console.log(error)})
};
var clearmsg=()=>{
  var t1=document.getElementById("msg");
  t1.value="";
}
var showmsg=()=>{
  var t1=document.getElementById("msg");
  t1.value="Invalid Crendential!!";
}
 
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
                  <div className="row welcomeTitle">Login</div>
                  <input type="text" placeholder="username" name="Username" required value={credential.Username} onChange={ontext} />
                  <input type="password" placeholder="password" name="password" required value={credential.password} onChange={ontext}/>
                  <button onClick={validatelogin}>login</button>
                  <p class="message">
                    <a className="signupLink" onClick={toggleUserRegister}>
                      UserSignup
                    </a>
                    {/* <a className="signupLink" onClick={toggleSellerRegister}>
                      SellerSignup
                    </a><br/><br/> */}
                    <a className="signupLink" onClick={toggleSellersignin}>
                      SellerSignIn
                    </a>
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

export default Login;
