import { createUser, loginUser, logoutUser } from "../controllers/user.controller"




const router= Router()

router.route('/signup')
.post(createUser)

router.route('/login')
.post(loginUser)

router.route('/logout')
.post(logoutUser)
export default router