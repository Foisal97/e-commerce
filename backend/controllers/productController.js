import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

//@desc Fetch all products
//@route  GET /api/products
//@access  Public
const getProducts = asyncHandler(async(req, res)=> {
    const products = await Product.find({});
    if(products){
        return res.json(products)
    }
    else{
        res.status(400)
    }

});

//@desc Fetch a product
//@route  GET /api/products/:id
//@access  Public
const getProductsById = asyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }
    else {
        res.status(400);
    }
});

export {getProducts, getProductsById}
