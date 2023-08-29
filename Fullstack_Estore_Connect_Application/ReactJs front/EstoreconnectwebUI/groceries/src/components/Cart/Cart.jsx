import { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import Header from "../shared/Header/Header";
import { useNavigate } from "react-router-dom";
const Cart = (props) => {
  const[cartitem,setcartitem]=useState([]);
  const[totol,settotal]=useState(0);
  const[pbefore,setpbefore]=useState(0);
  const[pafter,setpafter]=useState(0);
  const nav=useNavigate();
  const cartid=window.sessionStorage.getItem("cartid");
  const uri="http://localhost:63464/api/cart/"+cartid;
  const shopid=window.sessionStorage.getItem("shopid");
  const userid=window.sessionStorage.getItem("userid");
  const placeuri="http://localhost:63464/api/place/"+shopid+"/"+userid+"/"+cartid;
  const imgpath="data:image/jpeg;base64,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";
  useEffect(()=>{
    
    axios.get(uri)
    .then((res)=>{setcartitem(res.data)})
    .catch((error)=>console.log(error))
  },[])

  useEffect(() => {
    let calculatedPriceBeforeTotal = 0;
    let calculatedPriceAfterTotal = 0;
    cartitem.forEach((p) => {
      calculatedPriceBeforeTotal += p.p_price_before;
      calculatedPriceAfterTotal += p.p_price_after;
    });

    setpbefore(calculatedPriceBeforeTotal);
    setpafter(calculatedPriceAfterTotal);
    settotal(calculatedPriceBeforeTotal - calculatedPriceAfterTotal);
  }, [cartitem]);
  const deleteproduct=(id)=>{
    debugger;
    axios.get("http://localhost:63464/api/removeprod/"+id+"/"+cartid)
    .then((response)=>{var data=response.data;
    if(response.status!=200)
    {
      alert("something went wrong");
    }
    else{
      window.location.reload();
    }
    
    })
  }
  const placeorder=()=>{
    debugger;
    if(pafter==0 && pbefore==0)
    {
      alert("Cart is Empty!!")
      return;
    }
    axios.get(placeuri)
    .then((response)=>{var data=response.data;
    if(response.status==400 && pafter==0)
    {
      alert("Cart is Empty");
      nav("/cart");
      
    }
    else{
      alert("Order placed!!");
      
      nav("/Myorders");
    }
    })
  }
  return (
    <>
      {/* <div className="popup-box">
        <div className="boxCart">
          <span className="close-iconCart" onClick={props.handleClose}>
            x
          </span> */}

          {/* <div className="login-container">
            <div class="login-page"> */}
            <Header/>
              <div class="form">
                <div class="login-form">
                  <div className="row welcomeTitle">My Cart</div>
                  <div className="card1">
                    {
                      cartitem.map((p)=>{
                        debugger;
                       
                        return(<div className="row">
                        
                      <div className="col imgSectionCart">
                        {/* enter Image */}
                        <img src={imgpath} style={{height:60,width:70}}></img>
                      </div>
                      <div className="col text-left">
                        <div className="row name">
                          <span>{p.pname}</span>
                        </div>
                        <div className="row weight">
                          <span> {p.pweight_}gm/ml</span>
                        </div>

                        <div className="row price">
                          <span className="col">RS.{p.p_price_after}</span>
                        </div>
                      </div>
                      <div className="col text-right">
                        <div className="addProdButtonCart">
                          <span>-</span>
                          <span>1</span>
                          <span>+</span>
                        </div>
                        <div>
                          <button onClick={()=>deleteproduct(p.Id)}>Remove</button>
                          </div>
                      </div>
                    </div>
)})
                    }
                    {/* <div className="row">
                      <div className="col imgSectionCart">
                        {/* enter Image */}
                {/* </div>
                    
                  </div>  */}

                  <div className="billingCart">
                    <span className="row billingHeader">Bill Details</span>
                    {/* <span className="row">
                      <div className="col-8">MRP:</div>
                      <div className="col">300 Rs</div>
                    </span>
                    <span className="row">
                      <div className="col-8">Delivery charge:</div>
                      <div className="col">Free</div>
                    </span>
                    <span className="row">
                      <div className="col-8">Grand total:</div>
                      <div className="col"> 358 Rs</div>
                    </span> */}
                    <table>
                      <tr>
                        <td>MRP: </td>
                        <td className="ml-3">RS.{pbefore}</td>
                      </tr>
                      <tr>
                        <td>Discount: </td>
                        <td>RS.{pbefore-pafter}</td>
                      </tr>
                      <tr>
                        <td>Delivery Charge: </td>
                        <td>RS.0</td>
                      </tr>
                      <tr>
                        <td>Total: </td>
                        <td>Rs.{pafter}</td>
                      </tr>
                    </table>
                  </div>

                  <button onClick={placeorder}>Place order</button>
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
      
    </>
  );
};

export default Cart;
