import mongoose from "mongoose";

export const Status = {
    pending: "pending",
    completed: "completed",
    inProgress: "inProgress",

}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    status:{
        type: String,
    enum: Object.values(Status),
    required: true,
    default: Status.pending,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    },{
        timestamps: true,
    });




    export const Todo =  mongoose.model('Todo', todoSchema);