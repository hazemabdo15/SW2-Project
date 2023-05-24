import { Router } from "express";
import { all, create, show, store } from "../controllers/doctor.js";
const router = new Router();

router.get("/", all)
router.get("/create_doctor", create)
router.post("/", store)
router.get('/:_id', show)

export default router;