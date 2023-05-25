import { Router } from "express";
import { create, getAll, store, edit, update, deleteone, testShow } from "../controllers/subject.js";

const router = new Router();

router.get("/", getAll);
router.get("/create_subject", create);
router.post("/", store)
router.get('/:_id', testShow)
router.get("/:_id/edit", edit)
router.put('/:_id', update)
router.delete('/:_id', deleteone)

export default router;