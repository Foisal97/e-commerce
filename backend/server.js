import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import productRoutes from "./routes/productRoutes.js"

const port = process.env.PORT

connectDB();
const app = express()

app.get("/", (req,res)=>{
    res.send("api is running");
})

app.use("/api/products", productRoutes)

app.listen(port, ()=> console.log(`server running on port ${port}`))