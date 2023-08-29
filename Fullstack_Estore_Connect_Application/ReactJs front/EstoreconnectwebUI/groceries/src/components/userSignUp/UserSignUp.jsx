import { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import "./userSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserSignUp = (props) => {
  const id=window.sessionStorage.getItem("userid");
const[user,setuser]=useState({Id:"",fname:"",lname:"",email:"",mobile:"",city:"",address:""});
const nav=useNavigate();
useEffect(()=>{
  debugger;
  axios.get("http://localhost:63464/api/update/"+id)
  .then((res)=>{var data=res.data;setuser(data)})
  .catch((error)=>console.log(error))
},[])

const ontext=(arg)=>{
  var copy={...user};
  copy[arg.target.name]=arg.target.value;
  setuser(copy);
}
const updated=()=>{
 
  debugger;
  
axios.post("http://localhost:63464/api/UpdateCustomer",user)

.then((res)=>{if(res.status==204){
  alert("User Updated..!!");
  nav("/");
}
else{
  alert("Something went Wrong..!!");

}
})
}
  return (
    <>
      
<Header/>
          <div className="login-container">
            <div class="login-page">
              <div class="form">
                <div class="login-form">
                  <div className="row welcomeTitle">Edit Profile</div>
                  <input type="text" name="fname"value={user.fname} onChange={ontext} placeholder="Firstname" />
                  <input type="text" name="lname"value={user.lname} onChange={ontext} placeholder="Lastname" />
                  <textarea
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={user.address}
                    onChange={ontext}
                    rows="3"
                  ></textarea>
                  <input type="email" name="email" value={user.email}  onChange={ontext}placeholder="Email" disabled />
                  <input type="text" name="city" value={user.city}  onChange={ontext} placeholder="City" />
                  <input type="contact" name="mobile" value={user.mobile}  onChange={ontext} placeholder="Mobile Number" />
                  <input type="number" name="pincode" value={user.pincode}  onChange={ontext} placeholder="Pincode" />
                  <input type="text" name="Id" value={user.Id} hidden></input>
                  <button onClick={updated}>Update</button>
                </div>
              </div>
            </div>
          </div>
      
    </>
  );
};
export default UserSignUp;
