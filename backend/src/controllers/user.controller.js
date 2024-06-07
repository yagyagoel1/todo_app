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


export {createUser}