import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import { response } from "express";


//login user
const loginUser = async(req,res)=>{
   const {email,password} = req.body;
   try{
      const user=await userModel.findOne({email});
      if(!user){
        return res.json({success:false, message:"User Doesn't exist"})
      }
      
        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
           return res.json({success:false,message:"Invalid credentials"})
        }

        const token =createTokent(user._id);
        res.json({success:true,token}) 
   }
   catch(error){
     console.log(error);
     res.json({success:false,message:"error"})
     
   }
}

const createTokent =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register user
const registerUser = async(req,res)=>{
 const {name,password,email} =req.body;
    try{
        //checking if user already exist
         const exists =await userModel.findOne({email});
            if(exists){
                return res.json({success:false,message:"user already exists"})
            }
        //validating email format & strong password
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"Please enter valid email"})
            }
            if(password.length<8){
                return res.json({success:false,message:"Please enter a strong password"})
            }

           //hashing user password (value can be set from the 5-15 higher the number stronger the password)
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser =new userModel({
                name:name,
                email:email,
                password:hashedPassword
            })

            const user = await newUser.save()
            const token = createTokent(user._id)
            res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        res.json({sucess:false,message:"error"})
    }
}


export {loginUser,registerUser}