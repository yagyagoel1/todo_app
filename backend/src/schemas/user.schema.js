import { z } from "zod"



export const createUserSchema = (data)=>{
    const schema   = z.object({
        email: z.string().email(),
        fullName: z.string().min(3),
        password: z.string().min(6),
    })
    return schema.safeParse(data);
}
export const loginUserSchema = (data)=>{
    const schema   = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    return schema.safeParse(data);
}   