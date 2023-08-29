
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header/Header";

function AllOrders(){
   

    
    const [allProducts, setAllProducts] = useState([]);
    const shopid=window.sessionStorage.getItem("shopid");
    const nav=useNavigate();
    const uri="http://localhost:63464/api/ShopAllorder/"+shopid;
         useEffect(()=>{
            debugger;
        axios.get(uri)
        .then((res)=>setAllProducts(res.data))
        .catch((error)=>console.log(error));
     },[]);
     
     const deliverd=(orderid)=>{
        axios.get("http://localhost:63464/api/delivared/"+orderid)
        .then((res)=>{if(res.status==200)
        {
          window.location.reload();
        }
        else{
            alert("something went wrong!!");
        }
        })

     }

     const cancelled=(orderid)=>{
        axios.get("http://localhost:63464/api/cancelOrder/"+orderid)
        .then((res)=>{if(res.status==200)
        {
            window.location.reload();
        }
        else{
            alert("something went wrong!!");
        }
        })

     }
      
      return (
        
        <div className="rowMargin">
          
          <table className="table table-bordered">
            <thead>
              <tr className="tableSellerHeader">
                <th>OrderID</th>
                {/* <th>Customer Name</th> */}
                <th>Address</th>
                <th>Order Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((obj) => (
                <tr key={obj.OrderId}>
                  <td>{obj.OrderId}</td>
                  {/* <td>{obj.Username}</td> */}
                  <td>{obj.UserAddress}</td>
                  <td>{obj.Orderamount}</td>
                  <td>{obj.OrderStatus}</td>
                  <td><center><button className="btn btn-primary" onClick={()=>deliverd(obj.OrderId)}>Deliver order</button>
                  <button className="btn btn-danger" onClick={()=>cancelled(obj.OrderId)}>Cancel order</button>
                  </center></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
    }
    
    
    

export default AllOrders;