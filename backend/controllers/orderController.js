import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js";

//@desc Create new order
//@route  POST /api/orders
//@access  private
const addOrderItems = asyncHandler(async (req, res, next) => {
    try {
        console.log("Processing order...");

        const {
            orderItems,
            saveShippingAddress, // Corrected to match payload structure
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            console.error("Validation Error: No order items provided");
            res.status(400);
            throw new Error("No order items");
        }

        // Map the correct shipping address from saveShippingAddress
        const shippingAddress = {
            address: saveShippingAddress?.address,
            city: saveShippingAddress?.city,
            postalCode: saveShippingAddress?.postalCode,
            country: saveShippingAddress?.country
        };

        // Validate shipping address fields
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            console.error("Validation Error: Missing required shipping address fields");
            res.status(400);
            throw new Error("Shipping address is incomplete");
        }

        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user?._id, // Optional chaining to avoid crashes if req.user is undefined
            shippingAddress, // Now correctly assigned from saveShippingAddress
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        console.log("Order created successfully:", createdOrder);

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Error in addOrderItems:", error.message);
        next(error);  // Forward error to global error handler
    }
});




//@desc Get logged in users order
//@route  GET /api/orders/myorders
//@access  Private
const getMyOrders = asyncHandler(async(req, res)=> {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
   });

//@desc Get order by id
//@route  POST /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async(req, res)=> {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("order not found");
    }
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