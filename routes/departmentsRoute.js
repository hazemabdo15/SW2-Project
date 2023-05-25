import { Router } from "express";
import { create, getAll, store, show, edit, update, deleteone } from "../controllers/department.js";
const router = new Router();

router.get("/", getAll);
router.get("/create_department", create)
router.post("/", store)
router.get('/:_id', show)
router.get("/:_id/edit", edit)
router.put('/:_id', update)
router.delete('/:_id', deleteone)


export default router;