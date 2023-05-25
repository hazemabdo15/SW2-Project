import { Schema, model } from "mongoose";
const department = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    code: {
        type: String,
        required: false,
        unique: true,
    },
}, { timestamps: true });




export default model('department', department);;