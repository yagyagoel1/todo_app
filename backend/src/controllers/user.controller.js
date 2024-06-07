import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";


const createUser =  asyncHandler(async (req, res) => {
    const { email, fullName, password} = req.body;
    const validate = await createUserSchema.validate({email, fullName, password});
    if(validate.error){
        return res.status(400).json(new ApiError(400, validate.error.message));
        
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json(new ApiError(400, "User already exists"));
    }
   const user =  await User.create({email, fullName, password}).select("-password");
   res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const validate = await loginUserSchema.validate({email, password});
    if(validate.error){
        return res.status(400).json(new ApiError(400, validate.error.message));
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json(new ApiError(400, "Invalid email or password"));
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        return res.status(400).json(new ApiError(400, "Invalid email or password"));
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(200)
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    })// set the refresh token in a cookie
    .json(new ApiResponse(200, "Login successful", {accessToken}));// send the access token in the response
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken").json(new ApiResponse(200, "Logout successful"));
});
export {createUser,loginUser}