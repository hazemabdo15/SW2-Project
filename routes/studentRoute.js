import { Router } from "express";
import { all, create, store, show ,edit,update,deleteone} from "../controllers/student.js";

const router = new Router();

router.get("/", all);
router.get("/create_student", create)
router.get('/:_id', show)
router.post("/", store)
router.get('/:_id/edit',edit)
router.put('/:_id', update)
router.delete('/:_id', deleteone)
export default router;