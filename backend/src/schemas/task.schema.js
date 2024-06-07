import { z } from "zod";
import { Status } from "../models/todo.model";





export const createTaskSchema = (data)=>{
  const schema = z.object({
        title: z.string().min(1),
        description: z.string().min(1).max(500),
        status: z.nativeEnum(Status),
        dueDate: z.string(),
    })
    return schema.safeParse(data);
}
export const updateTaskSchema = (data)=>{
    const schema = z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).max(500).optional(),
        status: z.nativeEnum(Status).optional(),
        dueDate: z.string().optional(),
    })
    return schema.safeParse(data);
}