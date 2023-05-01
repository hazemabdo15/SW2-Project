import departmentModel from "../models/departmentModel.js";
import subjectsModel from "../models/subjectsModel.js";

export const index =async (req,res) =>
 { 
    const subjects = await subjectsModel.find({},{ name:1 }).lean();
    console.log(subjects);
    
        res.render("subjects/index", {subjects:subjects}); 
    };


    export const create=async(req,res)=>{


        const departments = await departmentModel.find().lean();
        res.render('subjects/create',{departments});

    }

    export const store =async (req,res)=>{

        const {name,code,department}=req.body;

        await subjectsModel.create({
            name,
            code,
            department
        });
        
        res.redirect('/subjects');
    }

    export const show =async(req,res)=>{
        const {_id}=req.params;
       const oneSubject= await subjectsModel.findById(_id)
       .populate('department')
       .lean();
       console.log(oneSubject);
       res.render('subjects/show',{subject:oneSubject})
    }