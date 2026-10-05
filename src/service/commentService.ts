import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { comment, NewComment } from "../types/comments.types";

export const createCommentsBySubmissions = async (appData: NewComment): Promise<comment> => {
    const { submissionId, userId, content, type } = appData;
    const { rows } = await query(
        `INSERT INTO comments 
        (submissionId, userId, content, type) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
         [submissionId, userId, content, type]
        );
    return rows[0];
};

export const getCommentsBySubmissionId = async (submissionId: number): Promise<comment[]> => {
    const { rows } = await query(
        `SELECT * FROM comments
        WHERE submissionId = $1`,
        [submissionId]
    );
    return rows;
};

export const updateCommentById = async (id: number, content: string): Promise<comment | null> => {
    const { rows } = await query(
        `UPDATE comments SET content = $1 WHERE id = $2 RETURNING *`,
        [content, id]
    );
    return rows[0] || null;
};

export const deleteCommentById = async (id: number): Promise<comment | null> => {
    const { rows } = await query(
        `DELETE FROM comments WHERE id = $1 RETURNING *`, 
        [id]
    );
    return rows[0] || null;
};
