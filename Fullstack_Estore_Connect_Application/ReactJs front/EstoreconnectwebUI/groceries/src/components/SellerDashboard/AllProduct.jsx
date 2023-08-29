// ... (imports and other code)

import axios from "axios";
import { useEffect, useState } from "react";

// ... (imports and other code)

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const shopid = window.sessionStorage.getItem("shopid");
  const uri = "http://localhost:63464/api/GetProductshop/" + shopid;
  const imgpath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTmigjkFjT-rqHI70lOPOWvgLr5Q_gndWbw&usqp=CAU";

  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (prodId) =>{
    debugger;
    axios.delete('http://localhost:63464/api/DeleteShopProduct/'+prodId+"/"+shopid)
    .then(response => {
      if(response.status == 200){
        alert("Product deleted..!")
        window.location.reload();
      }
      else{
        alert("Something went wrong..!")
      }
      debugger;
    
    })
    .catch(err => console.log("Error while deleting shop product : "+err))
  }

  return (
    <>
      {/* all product */}
      <div className="rowMargin kaypan">
        <table className="tableSellerHeader">
          <thead>
            <tr>
              <th>ID</th>
              <th>PName</th>
              <th>PCompany</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>RegistrationDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr className="rowSize kaypan" key={product.Id}>
                <td>{product.Id}</td>
                <td>{product.pname}</td>
                <td>{product.pmanufacture}</td>
                <td>{product.p_price_after}</td>
                <td><img src={imgpath} style={{height:100,width:200}}></img></td>
                {/* Add more columns or elements as needed */}
                <td>
                  {product.ProductShops.map((proShop) => (
                    <div key={proShop.Id}>{proShop.pstatus}</div>
                  ))}
                </td>
                <td>
                  {product.ProductShops.map((proShop) => (
                    <div key={proShop.Id}>{proShop.pregistrationdate}</div>
                  ))}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() =>{handleDelete(product.Id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProduct;
