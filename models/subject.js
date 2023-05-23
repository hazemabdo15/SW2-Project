import { Schema, model } from "mongoose";

const subject = new Schema({

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: false
    },

    department: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'department'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: false

    }],
    doctors: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: false

    },

}, { timestamps: true });




export default model('subject', subject);