
import doctorModel from "../models/doctor.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginform = (req, res) => {
    res.render("authentication/loginDoctor", { layout: false })
}
export const login = async (req, res) => {
    const { email, password } = req.body
    const loggeduser = await doctorModel.findOne({ email })
    console.log(loggeduser)

    const iscorrectpassword = bcrypt.compareSync(password, loggeduser.password)
    if (!iscorrectpassword) {
        return res.send("incorrect creditains")
    }

    const data = {
        _id: loggeduser._id,
        email: loggeduser.email
    }
    const jwtTocken = jwt.sign(data, process.env.JWT_SECRET)
    console.log(jwtTocken)
    res.cookie("token", jwtTocken)
    res.send("logged")
    //res.render("authentication/registerDoctor", { layout: false })
}