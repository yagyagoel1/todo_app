import { Router } from "express"
import { createUser, loginUser, logoutUser } from "../controllers/user.controller.js"
import { verifyUser } from "../middlewares/verifyUser.middleware.js"




const router= Router()

router.route('/signup')
.post(createUser)

router.route('/signin')
.post(loginUser)

router.route('/logout')
.post(verifyUser,logoutUser)
export default router