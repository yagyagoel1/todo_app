import { Todo } from "../models/todo.model.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const  getTasks  = asyncHandler(async (req, res) => {
    const userId = req.user;
    const page = parseInt(req.query.page) || 1;
    //getTodos
    const tasks = await  Todo.find({owner:userId}).limit(10).skip(10*(page-1));
    res.status(200).json(new ApiResponse(200, 'Tasks fetched successfully', tasks));
});

const getTaskById= asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const task = await Todo.findById(id);
    if(!task){
        return res.status(404).json(new ApiError(404, 'Task not found', []))
    }

    res.status(200).json(new ApiResponse(200, 'Task fetched successfully', task));
});

const createTask = asyncHandler(async (req, res, next) => { 
    let {title,description,dueDate,status} = req.body;

    const validate= createTaskSchema({title,description,dueDate,status});
    if(!validate.success){
        return res.status(400).json(new ApiError(400, validate.error.message, []))
    }
    const createdTask = await Todo.create({title,description,dueDate,status,owner:req.user});
    res.status(201).json(new ApiResponse(201, 'Task created successfully', createdTask));
})
export { getTasks,getTaskById,createTask}