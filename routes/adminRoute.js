import { Router } from "express";
const router = new Router();

router.get("/" , (req,res) => {
    res.render("admin", {layout: false})
})




export default router;