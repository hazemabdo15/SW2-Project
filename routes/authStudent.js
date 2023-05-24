import { Router } from "express";
import { loginform, login,showpdf } from "../controllers/authstudent.js";
import cookieStudent from '../middleware/authenticationStu.js';
import subjectModel from "../models/subject.js"

const router = new Router();


router.get("/", loginform)
router.post("/", login)

router.get("/show_pdf", showpdf);
router.get("/:_pdf",(req,res)=>{
    const {_pdf} = req.params;
    res.render("student/subjects/lecture",{layout:false,_pdf}) 
  })
router.get("/show_pdf/all",async(req,res)=>{
  const subjects = await subjectModel.find({}, { name: 1 }).lean();
  res.render("student/subjects/all_subjects",{layout:false,subjects}) 

  })
router.get("/show_pdf/all/add",async(req,res)=>{
    res.send("Done")
  
    })






export default router;