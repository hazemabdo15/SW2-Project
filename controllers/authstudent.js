
import studentModel from "../models/student.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pdfmodel from "../models/pdfFilesModel.js"
import subjectModel from "../models/subject.js"

let studentId;

export const loginform = (req, res) => {
    res.render("authentication/loginStudent", { layout: false })
}
export const login = async (req, res) => {
    
    const studentinf =req.student
    studentId=studentinf._id;

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
    const id=studentinf._id
    
    const jwtTocken = jwt.sign(data,process.env.JWT_SECRET)
    //console.log(jwtTocken)
    res.cookie("token",jwtTocken)
    const name=await studentModel.findById(studentinf,{name:1})
        const studentName =name.name;
        studentModel.findById(id, { subjects: 1 })
        .populate("subjects")
        .exec()
        .then((studentSubjects) => {
            if (studentSubjects) {
                const studentSubjectIDs = studentSubjects.subjects
                const studentSubjectNames = studentSubjectIDs.map((singleSubject) => singleSubject.name)
                console.log("student subject names :", studentSubjectNames)
                res.render("student/subjects/student", { layout: false, studentName, studentSubjectNames })

                // studentSubjects => array has all names of the student subjects
            }
            else {
                console.log("There is no such Subject")
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
} catch (error) {
    res.send("not found ")
}
    
}


export const showpdf = async (req, res) => {
    const {_subjectName} = req.params;

    console.log("subject name is : "+_subjectName);
    const subjectId = await subjectModel.find({name:_subjectName},{_id:1})
    console.log("id is : "+ subjectId);
    const pdf = await pdfmodel.find({subjectId:subjectId},{filename:1}).lean();
    console.log(pdf)
    res.render("student/subjects/show_pdf", { layout: false, pdf })

};
export const addSubject=async (req,res)=>{
    const {_subject}=req.params
    const studentid =studentId;
    console.log(_subject);
    console.log("done ?"+studentid);
    const Subjectid= await subjectModel.findOne({name:_subject},{_id:1})
    console.log(Subjectid);
    const subjectsArr=[Subjectid]
    studentModel.updateOne(studentid,{$set:{subjects:subjectsArr}})
        res.send("Done")
    
    
    
      }
