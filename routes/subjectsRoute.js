import { Router } from "express";
import { create, getAll, show, store } from "../controllers/subject.js";

const router = new Router();

router.get("/", getAll);
router.get("/create_subject", create);
router.post("/", store)
router.get('/:_id', show)

export default router;