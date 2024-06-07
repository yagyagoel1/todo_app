import mongoose from "mongoose";



const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    status:{
        type: Status,
        required: true,
        default: 'active',
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    },{
        timestamps: true,
    });


    export const Status = {
        pending: "pending",
        completed: "completed",
        inProgress: "inProgress",
    
    }