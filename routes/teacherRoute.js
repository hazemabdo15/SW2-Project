import { Router } from "express";
const router = new Router();

router.get("/" , (req,res) => {
    res.render("teacher/teacher")
})




export default router;