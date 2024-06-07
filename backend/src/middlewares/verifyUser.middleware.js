import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/tokenHandler.js";







export const verifyUser = asyncHandler(async (req, res, next) => {
try {
        const refreshToken = req.cookies.refreshToken||req.headers.refreshToken;
        const accessToken = req.headers.authorization?.split(" ")[1]||"";
        const accessTokenDecoded = verifyToken(accessToken,process.env.ACCESS_TOKEN_SECRET);

        //accessTokenDecoded is null if token is undefined or is expired
        if (accessTokenDecoded===null) {
            if(!refreshToken){
                return res.status(401).json(new ApiError(401, "Unauthorized"));
            }
            else{
                const decoded = verifyToken(refreshToken,process.env.REFRESH_TOKEN_SECRET);
                if (!decoded) {
                   return res.status(401).clearCookie("refreshToken").json(new ApiError(401, "invalid token"));
                }
                const user = await User.findById(decoded._id);
                if(!user||user.refreshToken!==refreshToken){
                    return res.status(401).clearCookie("refreshToken").json(new ApiError(401, "invalid token"));
                }
                const NewaccessToken= await user.generateAccessToken();
                req.user = decoded._id;
                req.accessToken= NewaccessToken;
                next();
            }
        }
        else
        {
            req.user = accessTokenDecoded._id;
            next();
        
        }
} catch (error) {
    throw error;
}
});
