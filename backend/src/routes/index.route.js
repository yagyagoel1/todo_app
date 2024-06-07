
import { Router } from 'express'
import taskRouter from './tasks.route.js'
import userRouter from './user.route.js'
const router = Router()
router.use("/tasks",taskRouter)

router.use("/user",userRouter)

export default router