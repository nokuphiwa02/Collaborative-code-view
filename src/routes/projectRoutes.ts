import { Router } from "express";
import { addProject, getAllProjects } from "../controllers/projectController";
import { assignMembersToProject } from "../controllers/projectController";

const router = Router();

router.post("/projects", addProject);
router.get("/projects", getAllProjects);
router.put("/:Id/members", assignMembersToProject)

export default router;
