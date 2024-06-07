import ApiError from "./ApiError"





export const asyncHandler = (fn) => async(req, res, next) =>{
    try {
       await  fn(req, res, next)
    } catch (error) {
        console.log(`Something went wrong: ${error.message} `, error)
        res.status(500).json(new ApiError(500, "internal server error"))
    }
}