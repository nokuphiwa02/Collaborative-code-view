import { Router } from "express";
import { addSubmissions, getSubmissionsByProject, deleteSubmissionById } from "../controllers/submissionControllers";

const router = Router();

router.post("/submissions",addSubmissions);
router.get("/submission/:id/projects",getSubmissionsByProject);
router.delete('/submissions/:id',deleteSubmissionById);

export default router;