// import axios from "axios";
// import { useEffect, useState } from "react";
// import Header from "../shared/Header/Header";
// import '../Myshop/Shopproduct.css'; 

// function Shopdashboard() {
//     const [Allprod, setAllprod] = useState([]); // Initialize as an empty array
//     const[cartItem,setcartItem]=useState([{CartID:"",Quantity:1}])
//     var uri = "http://localhost:63464/api/shop/20";

//     const handleQuantityChange = (cartItemId, newQuantity) => {
//         newQuantity = Math.max(newQuantity, 0);
//         const updatedCartItems = cartItem.map(cartItem =>
//             cartItem.CartID === cartItemId ? { ...cartItem, Quantity: newQuantity } : cartItem
//         );
//         setcartItem(updatedCartItems);
//     };

//     useEffect(() => {
//         axios.get(uri)
//         .then((response) => {
//             var data = response.data;
//             const extractedProducts = data.product.map((product) => ({
//                 id: product.Id,
//                 name: product.pname,
//                 weight: product.pweight_,
//                 image: product.pimage,
//                 priceBefore: product.p_price_before,
//                 priceAfter: product.p_price_after,
//                 category: data.productcategory[0].pcategory, // Assuming there's only one category in the array
//                 subcategory: data.productsubcategory[0].psubcategory // Assuming there's only one subcategory in the array
//             }));
//             setAllprod(extractedProducts);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     }, []);

//     return (
//         <div>
//             <Header />
//             <div className="shop-container">
//                 {Allprod.map((product) => (
//                     <div className="shop-card" key={product.id}>
//                         <table>
//                             <thead>
//                               <center><img style={{ height: 100, width: 100,display:"flex",justifyContent:"center",alignContent:"center" }} src="https://media.istockphoto.com/id/171302954/photo/groceries.jpg?s=612x612&w=0&k=20&c=D3MmhT5DafwimcYyxCYXqXMxr1W25wZnyUf4PF1RYw8=" alt="Product" /></center>
//                             </thead>
//                             <tbody>
//                                 <tr><td style={{ color: 'black', fontSize: 20 }}>ProductName:</td><td>{product.name}</td></tr>
//                                 <tr><td style={{ color: 'black', fontSize: 20 }}>ProductWeight:</td><td>{product.weight}ml/gm</td></tr>
//                                 <tr><td style={{ color: 'black', fontSize: 20 }}>ProductPriceBefore:</td><td>Rs.{product.priceBefore}</td></tr>
//                                 <tr><td style={{ color: 'black', fontSize: 20 }}>ProductPriceAfter:</td><td>Rs.{product.priceAfter}</td></tr>
//                                 {/* <tr><td style={{ color: 'black', fontSize: 20 }}>Category:</td><td>{product.category}</td></tr>
//                                 <tr><td style={{ color: 'black', fontSize: 20 }}>Subcategory:</td><td>{product.subcategory}</td></tr> */}
//                                 <tr><td colSpan={2}><center><button onClick={() => handleQuantityChange(cartItem.CartID, cartItem.Quantity - 1)}>-</button>
//                                 {cartItem.Quantity}
//                                 <button onClick={() => handleQuantityChange(cartItem.CartId, cartItem.Quantity + 1)}>+</button></center></td></tr>
//                                 <tr><td colSpan={2}><center><button className="btn btn-success">Add To Cart</button></center></td></tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Shopdashboard;


import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import '../Myshop/Shopproduct.css'; 

function Shopdashboard() {
    const [products, setProducts] = useState([]); 
    const [cart, setCart] = useState([]); 
    const[category,setcategory]=useState([]);
    const[subcategory,setsubcategory]=useState([]);
    const shopid=window.sessionStorage.getItem("shopid");
    const userid=window.sessionStorage.getItem("userid");
    const uri = "http://localhost:63464/api/shop/"+shopid;

    const imgpath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTmigjkFjT-rqHI70lOPOWvgLr5Q_gndWbw&usqp=CAU";
    
    const handleQuantityChange = (productId, newQuantity) => {
        // Prevent negative quantities
        newQuantity = Math.max(newQuantity, 1);
        
        // Update the cart with the new quantity
        const updatedCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    const handleAddToCart = (productId, quantity) => {
       axios.get("http://localhost:63464/api/cart/Addprodcart/"+userid+"/"+productId+"/"+quantity)
       .then((res)=>{var data=res.data;if(data==200){alert("product added");}else{alert("something went wrong")}})
       .catch((error)=>console.log(error))
        debugger;
        //const existingCartItem = cart.find(item => item.productId === productId);
        
        // if (existingCartItem) {
        //     // If the product is already in the cart, update its quantity
        //     handleQuantityChange(productId, existingCartItem.quantity + quantity);
        // } else {
        //     // If the product is not in the cart, add it with the given quantity
        //     setCart([...cart, { productId, quantity }]);
        // }
    };

    useEffect(() => {
        axios.get(uri)
        .then(response => {
            const data = response.data;
            const extractedProducts = data.product.map(product => ({
                id: product.Id,
                name: product.pname,
                image: product.pimage,
                priceBefore: product.p_price_before,
                priceAfter: product.p_price_after,
            }));
            setProducts(extractedProducts);


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

    return (
        <div>
            <Header />

            <div className="row category-header ">
            {/* <select className="col dropdown">
          <option disabled selected>
            More
          </option>
          <option>More</option>
          <option>More</option>
        </select> */}
                {category.map((cat)=>{return( <span className="col">{cat.cname} </span>)})}
       
        {/* <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span>
        <span className="col">Munchies</span> */}
        
      </div>
            <div className="shop-container">
                {products.map(product => (
                    <div className="shop-card" key={product.id}>
                        <table>
                            <thead>
                                <center><img style={{ height: 100, width: 100, display: "flex", justifyContent: "center", alignContent: "center" }} src={imgpath} alt="Product" /></center>
                            </thead>
                            <tbody>
                                <tr><td style={{ color: 'black', fontSize: 20 }}>ProductName:</td><td>{product.name}</td></tr>
                                <tr><td style={{ color: 'black', fontSize: 20 }}>ProductPriceBefore:</td><td>Rs.{product.priceBefore}</td></tr>
                                <tr><td style={{ color: 'black', fontSize: 20 }}>ProductPriceAfter:</td><td>Rs.{product.priceAfter}</td></tr>
                                <tr>
                                    <td colSpan={2}>
                                        <center>
                                            <button className="btn btn-warning" onClick={() => handleQuantityChange(product.id, (cart.find(item => item.productId === product.id)?.quantity || 1) - 1)}>-</button>
                                            {cart.find(item => item.productId === product.id)?.quantity || 1}
                                            <button className="btn btn-warning" onClick={() => handleQuantityChange(product.id, (cart.find(item => item.productId === product.id)?.quantity || 1) + 1)}>+</button>
                                        </center>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <center>
                                            <button className="btn btn-success" onClick={() => handleAddToCart(product.id, cart.find(item => item.productId === product.id)?.quantity || 1)}>Add To Cart</button>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shopdashboard;



