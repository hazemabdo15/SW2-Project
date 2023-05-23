import studentModel from "../models/student.js";
import bcrypt from "bcryptjs"


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

export const show = async (req, res) => {
    const { _id } = req.params;
    const onestudent = await studentModel.findById(_id).lean();
    console.log(onestudent);
    res.render("student/show_student", { layout: false, student: onestudent })
};
