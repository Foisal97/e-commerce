import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", asyncHandler(async(req, res)=>{ 
    const products = await Product.find({});
    throw new Error("some error")
    res.json(products);
}));


router.get("/:id", asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }
    else {
        res.status(400);
        throw new Error("Resource Not Found");
    }
}));

export default router;