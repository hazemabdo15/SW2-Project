import { Router } from "express";
import { loginform, login } from "../controllers/authdoctor.js";

const router = new Router();


router.get("/", loginform)
router.post("/", login)


export default router;