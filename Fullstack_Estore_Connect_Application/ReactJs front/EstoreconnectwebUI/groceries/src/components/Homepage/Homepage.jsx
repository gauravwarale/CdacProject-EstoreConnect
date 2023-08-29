import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Location from "../locationEntryPopup/Location";
import Header from "../shared/Header/Header";

import "./Homepage.css";
import axios from "axios";
export default function Homepage() {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const imgpath="https://www.foodnavigator-usa.com/var/wrbm_gb_food_pharma/storage/images/7/7/5/0/3400577-1-eng-GB/Snacks-sweets-are-key-online-opportunity-categories-for-new-online-grocery-shoppers-Hartman-Group.jpg";
  const [categoryArray, setCategoryArray] = useState([
    { name: "Food" },
    { name: "Medicine" },
    { name: "Skin care" },
    { name: "Food" },
    { name: "Food" },
    { name: "Food" },
    { name: "Food" },
    { name: "Food" },
  ]);
const nav =useNavigate();
useEffect(()=>{
  axios.get("http://localhost:63464/api/Getsubcat")
  .then((response)=>{setCategoryArray(response.data)});
},[])
  const navigate = useNavigate();
  const toggleLocationPopup = () => {
    setIsLocationOpen(false);
  };

  const openCategory = (id) => {
    window.location.reload();
  };
  return (
    <>
      <div className="row homePage">
        <Header />
        {categoryArray.map((cat, i) => (
          <div className="col-md-2" onClick={()=>{openCategory(cat.psubcatId)}}>
            <div className="homepageCard">
              <div className="imgSection"><img src={imgpath} style={{height:200,width:100}}/></div>
              <div className="productHeader">
                <div className="row name">
                  <span>{cat.psubcategory} </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLocationOpen && <Location handleClose={toggleLocationPopup} />}
    </>
  );
}
