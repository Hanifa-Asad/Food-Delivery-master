import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets"
import "./Myorders.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Myorders = () => {

    const {url,token} =  useContext(StoreContext);
    const [data,setData] = useState([]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const fetchOrders = async()=>{
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
       setData(response.data.data);
     
}
useEffect(()=>{
    if(token){
           fetchOrders();
    }
},[fetchOrders, token])

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                         <img src={assets.parcel_icon}/>
                         <p>
                            {order.items.map((item,index)=>{
                                if(index === order.items.length-1){
                                    return item.name+ "x" + item.quantity
                                }
                                else{
                                    return item.name+"x"+item.quantity+ ","
                                }
                            })}
                         </p>
                         <p>${order.amount}.00</p>
                         <p>Items: {order.items.length}</p>
                         <p><span>&#x25cf;</span><b>{order.status}</b></p>
                         <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })

            }

        </div>
    </div>
  )
}

export default Myorders



// import { assets } from "../../assets/frontend_assets/assets"
// import { StoreContext } from "../../Context/StoreContext";
// import "./Myorders.css";
// import { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";

// const Myorders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = useCallback(async () => {
//         if (!token) return;
//         try {
//             const response = await axios.post(
//                 `${url}/api/order/userorders`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setData(response.data.data);
//         } catch (error) {
//             console.error("Failed to fetch orders:", error);
//         }
//     }, [url, token]);

//     useEffect(() => {
//         fetchOrders();
//     }, [fetchOrders]);

//     return (
//         <div className="my-orders">
//             <h2>my orders</h2>
//             <div className="container">
//                 {
//                     data.map((order,index)=>{
//                         return(
//                           <div key={index} className="my-orders-order">
//                             <img src={assets.parcel_icon} alt=""/>
//                             </div>
//                         )
//                     }
//                 )}

//             </div>
//         </div>
//     )
// };

// export default Myorders;










// import { assets } from "../../assets/frontend_assets/assets"
// import { StoreContext } from "../../Context/StoreContext";
// import "./Myorders.css";
// import { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";

// const Myorders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = useCallback(async () => {
//         if (!token) return;
//         try {
//             const response = await axios.post(
//                 `${url}/api/order/userorders`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             console.log(response.data); // Check the response structure here
//             setData(response.data.data || []); // Ensure it's always an array
//         } catch (error) {
//             console.error("Failed to fetch orders:", error);
//             setData([]); // Set data to empty array on error
//         }
//     }, [url, token]);

//     useEffect(() => {
//         fetchOrders();
//     }, [fetchOrders]);

//     return (
//         <div>
//             <img src={assets.parcel_icon} />
//             {Array.isArray(data) && data.length > 0 ? (
//                 data.map((order) => (
//                     <div key={order.id}>
                    
//                     </div>
//                 ))
//             ) : (
//                 <p>No orders found or failed to load orders</p>
//             )}
//         </div>
//     );
// };

// export default Myorders;