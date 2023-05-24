import studentModel from "../models/student.js";
import bcrypt from "bcryptjs"
import fs from 'fs-extra'
import path from 'path';
const __dirname = path.resolve();
const sourcepathpdf = __dirname + '/public/uploads';




export const all = async (req, res) => {
    const students = await studentModel.find({}, { name: 1 }).lean()
    res.render("student/all_student", { layout: false, students })

}
export const create = (req, res) => {

    res.render("student/create_student", { layout: false })
}
export const store = async (req, res) => {
    const { name, email, password, acdmicNum } = req.body
    console.log(name, email, password, acdmicNum)
    const salt = bcrypt.genSaltSync(10);
    const encryptedpassword = bcrypt.hashSync(password, salt);
    await studentModel.create({
        name: name
        , email: email
        , password: encryptedpassword
        , acdmicNum: acdmicNum
    })
    console.log(encryptedpassword)

    res.redirect("/student_admin")
}
export const edit =async (req, res) => {
    const { _id } = req.params;
   const editformstudent = await studentModel.findById(_id).lean();
    res.render("student/edit_student", { layout: false ,editformstudent})
}

export const show = async (req, res) => {
    const { _id } = req.params;
    const onestudent = await studentModel.findById(_id).lean();
    console.log(onestudent);
    res.render("student/show_student", { layout: false, student: onestudent })
};

export const update = async (req, res) => {
    const { name, email, password, acdmicNum } = req.body
    const { _id } = req.params
    const salt = bcrypt.genSaltSync(10);
    const encryptedpassword = bcrypt.hashSync(password, salt);
    await studentModel.findByIdAndUpdate(_id,{
       $set: {
        name
        , email
        , password: encryptedpassword
        , acdmicNum}
    })
    console.log(encryptedpassword)

    res.redirect("/student_admin")
}

export const deleteone = async (req, res) => {
    const { _id } = req.params
    await studentModel.findByIdAndDelete(_id)
    res.redirect("/student_admin")
}

