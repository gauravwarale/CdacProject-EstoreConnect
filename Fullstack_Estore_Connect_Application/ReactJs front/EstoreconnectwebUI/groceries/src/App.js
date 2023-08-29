import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Location from "./components/locationEntryPopup/Location";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/shared/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MyOrders from "./components/MyOrders/MyOrders";
import SellerDashboard from "./components/SellerDashboard/SellerDashboard";
import AllProduct from "./components/SellerDashboard/AllProduct";
import Myshop from "./components/Myshop/Myshop";
import Shopdashboard from "./components/Myshop/Shopdashboard";
import AllOrders from "./components/SellerDashboard/AllOrders";
import Sellersign from "./components/Login/sellersign";
import Cart from "./components/Cart/Cart";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import SellerSignUp from "./components/SellerSignup/SellerSignup";
import CustomerSignUp from "./components/SellerSignup/CustomerSignUp";
import Changepass from "./components/SellerSignup/Changepass";
import UserSignUp from "./components/userSignUp/UserSignUp";


function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/home" />
        <Link to="/" />
        <Routes>
          <Route exact path="/home" element={<Homepage />} />
         <Route exact path="/CustomerSignUp" element={<CustomerSignUp/>}/>
         <Route exact path="/SellerSignUp" element={<SellerSignUp/>}/>
         <Route exact path="/changepass" element={<ProtectedRoute element={<Changepass/>}/>}/>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/sellerSignup" element={<SellerSignUp/>}/>
          <Route exact path="/dashboard" element={<ProtectedRoute element={<Dashboard />}/>} />
          <Route exact path="/myOrders" element={<ProtectedRoute element={<MyOrders></MyOrders>}></ProtectedRoute>} />
          <Route exact path="/SellerDashboard" element={<ProtectedRoute element={<SellerDashboard />}/>} />
          <Route exact path="/Myshop" element={<Myshop></Myshop>}/>
          <Route exact path="/Shopdashboard" element={<ProtectedRoute element={<Shopdashboard/>}/>}/>
          <Route exact path="/Addproduct" element={<ProtectedRoute element={<AllProduct/>}/>}/>
          <Route exact path="/AllOrder" element={<ProtectedRoute element={<AllOrders/>}/>}/>
          <Route exact path="/SellerDashBoard" element={<ProtectedRoute element={<SellerDashboard/>}/>}/>
          
          <Route exact path="/cart" element={<ProtectedRoute element={<Cart/>}/>}/>
          <Route exact path="/Sellersign"  element={<Sellersign/>}/>
           <Route exact path="/updateprofile" element={<ProtectedRoute element={<UserSignUp/>}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
