import { Router } from "express";
const router = new Router();


router.get("/", (req, res) => {
    res.render("authentication/loginAdmin", { layout: false })
})

router.post("/", (req, res) => {
    const { email, password } = req.body
    console.log(email, password )
    if (email == "so@gmail.com" && password == "11") {
        res.render("admin", { layout: false })
    }
})


router.get("/admin_page", (req, res) => {
    res.render("admin", { layout: false })
})




export default router;