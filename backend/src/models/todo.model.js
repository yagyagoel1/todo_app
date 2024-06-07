import mongoose from "mongoose";



const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: true,
        trim: true,
        lowercase:true
    },
    status:{
        type: Status,
        required: true,
        default: 'pending',
    },
    category:{
        type: String,
        required: true,
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

    export default mongoose.model('Todo', todoSchema);