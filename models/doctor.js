import { Schema, model } from "mongoose";

const doctor = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: false
    }]
}, { timestamps: true });

export default model('doctor', doctor);