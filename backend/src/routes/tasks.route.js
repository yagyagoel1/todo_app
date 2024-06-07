import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/tasks.controller.js";


const router  = Router()

router.route('/')
.get(verifyUser,getTasks)
.post(verifyUser,createTask)


router.route('/:id')
.get(verifyUser,getTaskById)
.put(verifyUser,updateTask)
.delete(verifyUser,deleteTask)


export default router