import "./MyOrders.css";
import Header from "../shared/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
const MyOrders = () => {
  const [showProductDetails, SetshowProductDetails] = useState(false);
  const [order,setorder]=useState([]);
  const userId=window.sessionStorage.getItem("userid");
  const uri="http://localhost:63464/api/GetMyorder/"+userId;
  const toggleProductDetailsView = () => {
    SetshowProductDetails(!showProductDetails);
  };
  useEffect(()=>{
    axios.get(uri)
    .then((response)=>{var data=response.data;
      setorder(data);
      
    })
    .catch((error)=>{console.log(error)})
  })
  return (
    <>
      <Header />
      <div className="row backBtnDiv">
        <button className="btn col-md-1" onClick={toggleProductDetailsView}>
          Back
        </button>
      </div>

      {!showProductDetails && (
        <div className="orderBox">
          <div className="row productRow orderTh">
            <div className="col">OrderId</div>
            <div className="col">OrderDate</div>
            <div className="col">Status</div>
            <div className="col">Amount</div>
            <div className="col"></div>
          </div>
          {order.map((p)=>{return(
            <div className="row productRow">
            <div className="col">{p.Id}</div>
            <div className="col">{p.odate}</div>
            <div className="col">{p.ostatus}</div>
            <div className="col">{p.ototal}</div>
            <div className="col">
              {/* <button
                className="btn viewDetailsBtn"
                onClick={toggleProductDetailsView}
              >
                View Details
              </button> */}
            </div>
          </div>
          )})}
          
          {/* <div className="row productRow">
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">
              <button
                className="btn viewDetailsBtn"
                onClick={toggleProductDetailsView}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="row productRow">
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">
              <button
                className="btn viewDetailsBtn"
                onClick={toggleProductDetailsView}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
      {showProductDetails && (
        <div className="detailsBox">
          <div className="row productRow orderTh">
            <div className="col">OrderId</div>
            <div className="col">OrderDate</div>
            <div className="col">Amount</div>
            <div className="col"></div>
          </div>

          <div className="row productRow">
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">gfd</div>
          </div>
          <div className="row productRow">
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">gfd</div>
          </div>
          <div className="row productRow">
            <div className="col">gfd</div>
            <div className="col">gfd</div>
            <div className="col">gfd</div>
          </div> */}
        </div>
      )}
    </>
  );
};
export default MyOrders;
