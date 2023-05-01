import { Router } from "express";
import departmentModel from "../models/departmentModel.js";
const router = new Router();

router.get("/" , async(req,res) => {

    
const departments = await departmentModel.find();
console.log(departments);
    res.render("department", {departments})
})




export default router;