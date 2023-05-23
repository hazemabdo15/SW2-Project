import { Router } from "express";
import { loginform, login } from "../controllers/authstudent.js";

const router = new Router();


router.get("/", loginform)
router.post("/", login)


export default router;