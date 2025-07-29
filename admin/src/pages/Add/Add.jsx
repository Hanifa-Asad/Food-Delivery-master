import {useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Add = ({url}) => {
    
    
    const [image,setImage] =useState(false);
    const [data,setData] =useState({
        name:"",
        description:"",
        price:"",
        category:"Starters"  
    })
    
    const onChangeHandler =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    
    // useEffect(()=>{
    //     console.log(data);
    // },[data])
    

    // const onSubmitHandler = async(event) =>{
    //      event.preventDefault();
    //      const formData =new FormData();
    //      formData.append("name",data.name)
    //      formData.append("description",data.description)
    //      formData.append("price",Number(data.price))
    //      formData.append("category",data.category)
    //      formData.append("image",image)
        
    //      const response =await axios.post(`${url}/api/food/add`, formData);

    //     if(response.data.success){
    //        setData({
    //             name:"",
    //             description:"",
    //             price:"",
    //             category:"Starters"  
    //         })
    //         setImage(false);
    //     }
        
    //     else{
    //         console.log("unsucessfull")
    //     }
        
    // }


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
      
        try {
          const response = await axios.post(`${url}/api/food/add`, formData);
          console.log(response);
          if (response.data.sucess) {
            // Reset form and image states
            setData({
              name: "",
              description: "",
              price: "",
              category: "Starters",
            });
            setImage(false);
            toast.success(response.data.message)
            console.log("Successfully added the product!");
          } else {
            toast.error(response.data.message);
            console.log("Failed to add the product:", response.data.message || "Unknown error");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      


  return (
    <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
              </label>
              <input onChange={(e)=>setImage(e.target.files[0])}type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here"/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product desciption</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                 <p>Product category</p>
                 <select  onChange={onChangeHandler} value={data.category}name="category">
                     <option value="Starters">Starters</option>
                     <option value="Burgers">Burgers</option>
                     <option value="Deserts">Desserts</option>
                     <option value="Sandwich">Sandwich</option>
                     <option value="Cake">Cake</option>
                     <option value="Soups">Soups</option>
                     <option value="Pasta">Pasta</option>
                     <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                  <p>Product Price</p>
                  <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20"/>
                </div>
            </div>
            <button type="submit" className="add-btn">ADD</button>
        </form>
    </div>
  )
}

export default Add