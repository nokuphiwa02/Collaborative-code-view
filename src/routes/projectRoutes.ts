import { Router } from "express"
import { addProject } from "../controllers/projectController"

const router = Router();

router.post('/projects', addProject)

export default router