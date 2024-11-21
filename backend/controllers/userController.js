import asyncHandler from "../middleware/asyncHandler.js";
import  User from "../models/userModel.js"
import jwt from "jsonwebtoken"

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
            expiresIn: "30d"
        });
        //set jwt http only cookie 
        res.cookie ("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30*24*60*60*1000
        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
    
})


//@desc Register user & get token
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async(req, res)=>{
    res.send("Register user");
})

//@desc Logout user & clear cookie 
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async(req, res)=>{
    res.send("logout user");
})

//@desc Get User Profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async(req, res)=>{
    res.send("user profile");
})


//@desc Update user profile 
//@route PUT /api/users/login
//@access Private

const updateUserProfile = asyncHandler(async(req, res)=>{
    res.send("update user");
})


//@desc Auth users
//@route GET /api/users/login
//@access Private/admin 

const getUsers = asyncHandler(async(req, res)=>{
    res.send("get users");
})


//@desc Delete users
//@route DELETE /api/users/:id
//@access Private/admin

const deleteUser = asyncHandler(async(req, res)=>{
    res.send("delete user");
})


//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/admin

const getUserByID = asyncHandler(async(req, res)=>{
    res.send("get user by id");
})


//@desc  Update user
//@route put /api/users/:id
//@access Private/admin

const updateUserByID = asyncHandler(async(req, res)=>{
    res.send("update user");
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUserByID
}