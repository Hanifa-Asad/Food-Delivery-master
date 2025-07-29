import { useEffect, useState } from "react";
import "./List.css";
import {toast} from "react-toastify"
import axios from "axios";

// eslint-disable-next-line react/prop-types
const List = ({url}) => {
  
  // const url ="http://localhost:4000"
  const [list,setList]= useState([]);

  const fetchList =async ()=>{
      const response= await axios.get(`${url}/api/food/list`);
      // console.log(response.data);
      if(response.data.sucess){
        setList(response.data.data)
      }
      else{
        toast.error("error")
      }
  }
   
  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.sucess){
      toast.success(response.data.message)
    }
    else{
      toast.error("error");
    }
  }


  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
               <img src={`${url}/images/`+item.image} alt=""/>
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>${item.price}</p>
               <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
              </div>
          )
        })}
      </div>

    </div>
  )
}

export default List