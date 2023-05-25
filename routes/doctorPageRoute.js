import { Router } from "express";
const router = new Router()
import { previewSubjects , pdfUpload, viewUpload} from "../controllers/doctorPageController.js"


router.get("/", previewSubjects)
router.get("/subjectPdfUpload/:_id",viewUpload)
router.post("/subjectPdfUpload/:_id",pdfUpload)



export default router;
