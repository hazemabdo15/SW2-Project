import { Router } from "express";
import { all, create, show, store ,edit,update,deleteone} from "../controllers/doctor.js";
const router = new Router();

router.get("/", all)
router.get("/create_doctor", create)
router.post("/", store)
router.get('/:_id', show)
router.get('/:_id/edit',edit)
router.put('/:_id', update)
router.delete('/:_id', deleteone)
export default router;