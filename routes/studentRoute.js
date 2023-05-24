import { Router } from "express";
import { all, create, store, show } from "../controllers/student.js";

const router = new Router();

router.get("/", all);
router.get("/create_student", create)
router.get('/:_id', show)
router.post("/", store)



export default router;