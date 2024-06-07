
import { Router } from 'express'
import taskRouter from './tasks.route.js'
import userRouter from './user.route.js'
const router = Router()
router.get('/ping',(req,res)=>{
   try {
     return res.status(200).send("pong")
   } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
   }
})
router.use("/tasks",taskRouter)

router.use("/user",userRouter)

export default router