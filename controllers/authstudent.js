
import studentModel from "../models/student.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pdfmodel from "../models/pdfFilesModel.js"
import subjectModel from "../models/subject.js"

export const loginform = (req, res) => {
    res.render("authentication/loginStudent", { layout: false })
}
export const login = async (req, res) => {
    
    const studentinf =req.student

    const { email, password, acdmicNum } = req.body
    //console.log(email, password, acdmicNum)
    try {
        const loggeduser = await studentModel.findOne({ email })
    //console.log(loggeduser)

    const iscorrectpassword = bcrypt.compareSync(password, loggeduser.password)
    if (!iscorrectpassword) {
        return res.send("incorrect creditains")
    }

    const data = {
        _id: loggeduser._id,
        email: loggeduser.email,
    }
    
    const jwtTocken = jwt.sign(data,process.env.JWT_SECRET)
    //console.log(jwtTocken)
    res.cookie("token",jwtTocken)
const subjects = await subjectModel.find({}, { name: 1 }).lean();
    //redirect after student login
    res.render("student/subjects/student",{layout:false,studentinf,subjects})
    } catch (error) {
        res.send("not found ")
    }
    
}


export const showpdf = async(req,res)=>{
    const pdf = await pdfmodel.find().lean();
    console.log(pdf)
    res.render("student/subjects/show_pdf",{layout:false,pdf})
  
  };
