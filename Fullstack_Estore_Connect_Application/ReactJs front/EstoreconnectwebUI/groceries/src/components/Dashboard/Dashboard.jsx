import "./Dashboard.css";
import Login from "../Login/Login";
import React, { useState } from "react";
import Popup from "../shared/Popup";
import Header from "../shared/Header/Header";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [product, setproduct] = useState([]);
  const[category,setcategory]=useState([]);
  const[subcategory,setsubcategory]=useState([]);
  const nav=useNavigate();
  // const loc = useLocation();
  // var citys = loc.state.city;
  // var pincodes = loc.state.pincode;
  // window.sessionStorage.setItem("pincode",pincodes);
  // window.sessionStorage.setItem("city",citys);
  // window.sessionStorage.setItem("shopname",shop.shopname);


  const shopid=window.sessionStorage.getItem("shopid");
  const userid=window.sessionStorage.getItem("userid");
  const uri = "http://localhost:63464/api/shop/"+shopid;

  const imgpath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTmigjkFjT-rqHI70lOPOWvgLr5Q_gndWbw&usqp=CAU";



var handlePageChange=(id)=>{
window.sessionStorage.setItem("shopid",id);
nav("/Shopdashboard");
}
useEffect(() => {
  axios.get(uri)
  .then(response => {
      const data = response.data;
      const extractedProducts = data.product.map(product => ({
          id: product.Id,
          name: product.pname,
          image: product.pimage,
          weight:product.pweight_,
          priceBefore: product.p_price_before,
          priceAfter: product.p_price_after,
      }));
      setproduct(extractedProducts);


      const extractedcategory = data.productcategory.map(product => ({
          cid: product.pcatId,
          cname: product.pcategory,
         
      }));
      setcategory(extractedcategory);


      const extractedsubcategory = data.productsubcategory.map(product => ({
          subcid: product.psubcatId,
          subcname: product.psubcategory,
         
      }));
      setsubcategory(extractedsubcategory);



  })
  .catch(error => {
      console.log(error);
  });
}, []);
const qty=1;
const handleAddToCart = (productId) => {
  debugger;
  axios.get("http://localhost:63464/api/cart/Addprodcart/"+userid+"/"+productId+"/"+qty)
  .then((res)=>{var data=res.data;if(data==200){alert("product added");}else{alert("something went wrong")}})
  .catch((error)=>console.log(error))};
  return (
    <>
      {/* category list */}
      <Header />
      <div className="row category-header ">
        {
          category.map((cat)=>{return(<span className="col">{cat.cname}</span>)})
        }
        
        {/* <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span> */}
        <select className="col moreDropdown">
          <option disabled selected>
            More
          </option>
          <option>More</option>
          <option>More</option>
        </select>
      </div>

      <div className="row mt-3 ">
        <div className="col-md-3">
          {/* subCategory */}

          <div className="subCatDiv">
            {subcategory.map((sub)=>{return(<span className="row subCat">{sub.subcname}</span>)})}
            
            {/* <span className="row subCat">paan</span>
            <span className="row subCat">paan</span>
            <span className="row subCat">paan</span>
            <span className="row subCat">paan</span> */}
          </div>
        </div>

        <div className="col">
          {/* productDetails */}

          <div className="row productRow">
            

              {product.map((p)=>{return(<div className="col">
              <div className="dashboadCard">
                <div className="imgSection"><img src={imgpath} style={{height:150,width:180}}></img></div>
                <div className="productHeader">
                  <div className="row name">
                    <span>{p.name}</span>
                  </div>
                  <div className="row weight">
                    <span>{p.weight}gm/ml</span>
                  </div>

                  <div className="row price">
                    <span className="col">Rs.{p.priceAfter}</span>
                    <div className="col text-right">
                      <button className="btn addBtn " onClick={()=>handleAddToCart(p.id)}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)})}           
          </div>
        </div>
      </div>
    </>
  );
}
