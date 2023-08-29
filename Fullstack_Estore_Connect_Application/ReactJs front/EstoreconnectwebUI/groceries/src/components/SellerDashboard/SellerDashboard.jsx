import { useState } from "react";
import Header from "../shared/Header/Header";
import "./SellerDashboard.css";
import { useNavigate } from "react-router-dom";
import AllProduct from "./AllProduct";
import AddProduct from "./AddProduct";

import AllOrders from "./AllOrders";
import Todayorder from "./Todayorder";

export default function SellerDashboard() {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [allProduct, setallPropduct] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [todayorder, settodayorder] = useState(false);
  const [allOrders, setAllOrders] = useState(false);

  const toggleAllProduct = () => {
    setAddProduct(false);
    settodayorder(false);
    setAllOrders(false);
    setallPropduct(true);
  };
  const toggleaddProduct = () => {
    setallPropduct(false);
    settodayorder(false);
    setAllOrders(false);
    setAddProduct(true);
  };
  const toggletodayorder = () => {
    setallPropduct(false);
    setAddProduct(false);
    setAllOrders(false);
    settodayorder(true);
  };
  const toggleAllOrders = () => {
    setallPropduct(false);
    setAddProduct(false);
    settodayorder(false);
    setAllOrders(true);
  };

  return (
    <>
      <Header />
      <div className="fullHeight">
        <div className="row mainHeader ">
          <button className="col" onClick={toggleAllProduct}>
            All Product
          </button>
          <button className="col" onClick={toggleaddProduct}>
            Add Product
          </button>
          <button className="col" onClick={toggletodayorder}>
            Todys order
          </button>
          <button className="col" onClick={toggleAllOrders}>
            All Orders
          </button>
        </div>

        {allProduct && <AllProduct />}
        {/* add product
         */}
        {addProduct && <AddProduct />}

        {/* todays order  */}
        {todayorder && <Todayorder />}

        {/* all orders  */}
        {allOrders && <AllOrders />}
      </div>
    </>
  );
}
