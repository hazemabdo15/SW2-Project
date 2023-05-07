import { Router } from "express";
import { create, getAll, store, show } from "../controllers/department.js";
const router = new Router();

router.get("/", getAll);
router.get("/create_department", create)
router.post("/", store)
router.get('/:_id', show)



export default router;