import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider =(props)=>{

  const [cartItems,setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token,setToken] = useState("") ;
  
  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId)=>{
    if(!cartItems[itemId]) {
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  }

  const removeFromCart= async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

const getTotalCartAmount=()=>{
  let totalAmount=0;
  for(const item in cartItems)
  {
      if (cartItems[item]>0){
        let itemInfo = food_list.find((product)=>product._id === item);
        totalAmount +=itemInfo.price *cartItems[item];
      }
    }
  return totalAmount;
}

  // useEffect(()=>{
  //   console.log(cartItems);
  // },[cartItems])
  
const fetchFoodList = async() =>{
  const response = await axios.get(url+"/api/food/list");
  setFoodList(response.data.data)
}
 

//for the count of items to persist when the page load 
const loadCartData = async (token)=>{
   const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
   console.log("Cart Data Response:", response.data);
   setCartItems(response.data.cartData);

};



  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  },[])

 


   const contextValue ={
     food_list,
     cartItems,
     setCartItems,
     addToCart,
     removeFromCart,
     getTotalCartAmount,
     url,
     token,
     setToken

   }

   return(
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
   )
}


export default StoreContextProvider;









// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [food_list, setFoodList] = useState([]);
//   const [token, setToken] = useState("");
//   const url = "http://localhost:4000";

//   // Add to cart
//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }

//     if (token) {
//       try {
//         await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//       } catch (error) {
//         console.error("Error adding item to cart:", error);
//       }
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       try {
//         await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//       } catch (error) {
//         console.error("Error removing item from cart:", error);
//       }
//     }
//   };

//   // Get total cart amount
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   // Fetch the list of food items
//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + "/api/food/list");
//       setFoodList(response.data.data);
//     } catch (error) {
//       console.error("Error fetching food list:", error);
//     }
//   };

//   // Load cart data
//   const loadCartData = async (token) => {
//     try {
//       const response = await axios.post(
//         url + "/api/cart/get",
//         {},
//         { headers: { token } }
//       );
//       console.log("Cart Data Response:", response.data);
//       if (response.data && response.data.CartData) {
//         setCartItems(response.data.CartData);
//       } else {
//         console.warn("Cart data is not in the expected format.");
//       }
//     } catch (error) {
//       console.error("Error loading cart data:", error);
//     }
//   };

//   // Initialize data on component mount
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         await fetchFoodList();
//         const storedToken = localStorage.getItem("token");
//         if (storedToken) {
//           setToken(storedToken);
//           await loadCartData(storedToken);
//         }
//       } catch (error) {
//         console.error("Error initializing data:", error);
//       }
//     };
//     loadData();
//   }, []);

//   // Context value
//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   // Return context provider
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;





