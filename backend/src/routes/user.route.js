import { createUser, loginUser } from "../controllers/user.controller"




const router= Router()

router.route('/signup')
.post(createUser)

router.route('/login')
.post(loginUser)

export default router