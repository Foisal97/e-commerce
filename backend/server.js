import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
dotenv.config();
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
const port = process.env.PORT

connectDB();
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie parser middleware
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("api is running");
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`server running on port ${port}`));