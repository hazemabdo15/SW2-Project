
import studentModel from "../models/student.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginform = (req, res) => {
    res.render("authentication/loginStudent", { layout: false })
}
export const login = async (req, res) => {
    const { email, password, acdmicNum } = req.body
    console.log(email, password, acdmicNum)
    const loggeduser = await studentModel.findOne({ email })
    console.log(loggeduser)

    const iscorrectpassword = bcrypt.compareSync(password, loggeduser.password)
    if (!iscorrectpassword) {
        return res.send("incorrect creditains")
    }

    const data = {
        _id: loggeduser._id,
        email: loggeduser.email,
        acdmicNum: loggeduser.acdmicNum
    }
    const jwtTocken = jwt.sign(data, process.env.JWT_SECRET)
    console.log(jwtTocken)
    res.cookie("token", jwtTocken)
    res.send("logged")
}