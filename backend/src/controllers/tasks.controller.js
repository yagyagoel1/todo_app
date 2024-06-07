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

export { getTasks,getTaskById}