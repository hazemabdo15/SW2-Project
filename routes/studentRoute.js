import { Router } from "express";
const router = new Router();

router.get("/" , (req,res) => {
    res.render("student", {layout: false})
})




export default router;