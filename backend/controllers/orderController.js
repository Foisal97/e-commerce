import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"

//@desc Create new order
//@route  POST /api/orders
//@access  private
const addOrderItems = asyncHandler(async(req, res)=> {
 res.send("add order items")
});


//@desc Get logged in users order
//@route  GET /api/orders/myorders
//@access  Private
const getMyOrders = asyncHandler(async(req, res)=> {
    res.send("get my orders")
   });

//@desc Get order by id
//@route  POST /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async(req, res)=> {
    res.send("get orders by id")
   });

//@desc Update order to paid
//@route  GET /api/orders/:id/pay
//@access  Private
const updateOrderToPaid = asyncHandler(async(req, res)=> {
    res.send("update order to paid")
   });

//@desc Update order to delivered 
//@route  GET /api/orders/:id/deliver
//@access  Private
const updateOrderToDelivered = asyncHandler(async(req, res)=> {
    res.send("update order to delivered")
   });

//@desc Get all orders
//@route  POST /api/orders
//@access  Private/admin
const getOrders = asyncHandler(async(req, res)=> {
    res.send("get all orders")
   });
 
export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};