import { Router } from "express";
import { addComment, getCommentsBySubmissionId, updateComment, deleteComment } from "../controllers/commentController";

const router = Router();

router.post("/:id/comments", addComment);
router.get("/:id/comments", getCommentsBySubmissionId);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

export default router;