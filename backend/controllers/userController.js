import asyncHandler from "../middleware/asyncHandler.js";
import  User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
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
    const { name, email, password } = req.body
    const userExists = await User.findOne({email});
    
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }
    
    const user = await User.create({
        name,
        email,
        password
    })
    if (user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        });
    }else{
        res.status(400);
        throw new Error("invalid user data");
    }
});

//@desc Logout user & clear cookie 
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie("jwt", "", {
        httpOnly:true,
        expire: new Date(0)
    });
    res.status(200).json({message: "log out successfully"});
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