import { createUser } from "../controllers/user.controller"




const router= Router()

router.route('/signup')
.post(createUser)


export default router