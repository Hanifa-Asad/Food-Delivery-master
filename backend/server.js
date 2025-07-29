import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routers/foodRoute.js";
import userRouter from "./routers/userRoute.js";
import "dotenv/config"
import cartRouter from "./routers/cartRoute.js";
import orderRouter from "./routers/orderRouter.js";


//app config

//initializing app
const app=express()
const port = process.env.PORT || 4000;


//middleware
//to get data from frontend to backend
app.use(express.json())
app.use(cors())
//to get data from backend to frontend


//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")

})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
//to request data from the server







// mongodb+srv://gayathripingili33:fooddel@cluster0.h3ej9.mongodb.net/?