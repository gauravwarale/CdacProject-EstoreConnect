// import { useState } from "react";

// function Changepass(){
// const[pass,setpass]=useState({oldpass:"",newpass:""})
// const chngepass=()=>{
//     axios.post("http://localhost:63464/api/otpforchangepassword",pass)
//     .then((res)=>{})
// }
// return(<>


// </>)

  
// }
// export default Changepass;

import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header/Header';

const Changepass = () => {
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isChangePasswordEnabled, setIsChangePasswordEnabled] = useState(false);

    const [message, setMessage] = useState();
    const nav = useNavigate;

    const userId = window.sessionStorage.getItem("userid");
    const userName = window.sessionStorage.getItem("userName");
    const userEmail = window.sessionStorage.getItem("email");

    const generateOTP = () => {
       
        const generatedOTP = Math.floor(100000 + Math.random() * 900000);
        setOtpGenerated(true);
        setOtp(generatedOTP.toString());
    
        const emailData ={
            to: userEmail, 
            subject: "Your One-Time Password for Password Change",
            message: "Hello "+ +",\n\nAs requested, here is your one-time password (OTP) for changing your account password: "+generatedOTP+".\n\nPlease use this code on the password change page to complete the process.\n\nThank you,\n getMeds.com ."
        };
    
        axios.post('http://localhost:63464/api/otpforchangepassword', emailData)
            .then(resp => {
                if (resp.status === 200) {
                    setMessage(resp.data);
                } else {
                    setMessage(resp.data);
                }
            });
    };
    

    const handlePasswordChange = (oldpass, newpass) =>{

        debugger;
        const cpData = {
                oldpass : oldpass,
                newpass : newpass
        }
        debugger;
        axios.post('http://localhost:63464/api/changepass/'+userId,cpData)
        .then(response => {
            if(response.status==200){
                alert("Password Changed successfully..!")
            }
            else if(response.status==400){
                alert("You Enter Wrong Old Password")
            }
            
            window.location.href='/';
        })
        .catch(err => console.log("Error while change password: "+err));

    }
    debugger;
    const verifyOTP = () => {
            
            const enteredOTP = document.getElementById('otp').value;
        
            
            const validOTP = otp; 
            debugger;
            if (enteredOTP === validOTP) {
                setOtpVerified(true);
                setIsChangePasswordEnabled(true);
            } else {
                
            }
        setOtpVerified(true);
    };

    return (<div><Header/>
    
    <div className="change-password-container">
            
            <br></br>
            <div className="change-password-form">
                <h2>Change Password</h2>
                <div className="password-fields">
                    <table>
                        <tbody>
                            <tr>
                                <th>Enter old Password</th>
                                <td>
                                    <input id='oldpass' type='password' name='oldPassword' placeholder='Enter old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                                    </td>
                            </tr>
                            <tr>
                                <th>Enter new Password</th>
                                <td><input id='newpass' type='password' name='password' placeholder='Enter new password' value={newPassword}  onChange={(e) => setNewPassword(e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form-group">
                    <label htmlFor="otp">Enter OTP:</label>
                    <input type="text" id="otp" className="form-control" onChange={(e) => setOtp(e.target.value)} disabled={!otpGenerated || otpVerified} />
                </div>
                <div className="form-group">
                    <button onClick={generateOTP} disabled={otpGenerated} className="btn btn-primary">Generate OTP</button>
                </div>
                <div className="form-group">
                    <button onClick={verifyOTP} disabled={!otpGenerated || otpVerified} className="btn btn-success">Verify OTP</button>
                </div>
                {otpVerified && <p className="otp-verified">OTP Verified! You can now change your password.</p>}
                <div className="form-group">
                {/* <button onClick={() => handlePasswordChange(document.getElementById('oldpass'), document.getElementById('newpass'))} className="btn btn-success"
                         disabled={!isChangePasswordEnabled} >
                        Change Password
                    </button> */}

                <button onClick={() => { handlePasswordChange(oldPassword, newPassword) }} disabled={!isChangePasswordEnabled} className="btn btn-success">
                    Change Password
                </button>
                <br></br>
                    <div>
                        <p className="otp-verified">{message}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
        
        
    );
};

export default Changepass;