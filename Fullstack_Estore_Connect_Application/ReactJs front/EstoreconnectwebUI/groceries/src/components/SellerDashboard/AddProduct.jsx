import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const[product,setproduct]=useState([]);
  const[dto,setdto]=useState({pname:"",pstatus:""});
  const shopid=window.sessionStorage.getItem("shopid");
  const getproduri="http://localhost:63464/api/AllProduct";
  const adduri="http://localhost:63464/api/Addproduct/"+shopid;
  useEffect(()=>{
    debugger;
    axios.get(getproduri)
    .then((Response)=>{setproduct(Response.data)})
    
    .catch((error)=>console.log(error))
    debugger;
  },[]);
  const Addprod=()=>{
    debugger;
    axios.post(adduri,dto)
    .then((res)=>{if(res.data==200){
      alert("Product addred!!");
      debugger;
    }})
    .catch((error)=>console.log(error))
  };
  const onchange=(args)=>{
    var copy={...dto};
    copy[args.target.name]=args.target.value;
    setdto(copy);

  }
  return (
    <div>
    <div className="rowMargin">
      <center><span style={{fontSize:20}}>Add New Product</span></center>
     <table className="table table-borderd">
      <thead>
        <tr>
        <th>Product Name:</th>
<th>
  <select name="pname" onChange={onchange}>
    <option disabled>Select product</option>
    {product.map((p) => (
      <option key={p.Id} value={p.pname}>
        {p.pname}
      </option>
    ))}
  </select>
</th>
        </tr>
        <tr>
        <th>Product Avability:</th>
            <th><input type="text" name="pstatus" placeholder="Availability" value={dto.pstatus} onChange={onchange} /></th>
        </tr>
        <tr><th colSpan={2}><center><button className="btn btn-success" onClick={Addprod}>Add Product</button></center></th></tr>
      </thead>
     </table>
    </div>
  </div>
  
    
  );
  
};

export default AddProduct;
