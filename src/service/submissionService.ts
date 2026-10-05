import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { submission,NewSubmission,submission_status } from "../types/submission.types";

export const createSubmission = async (appData: NewSubmission): Promise<submission> => {
    const { projectId, code_status } = appData;
    const { rows } = await query(
      `INSERT INTO code_submissions(projectId,submitted_at, code_status)
      VALUES($1, NOW(), $2)RETURNING *`,
      [projectId, code_status],
    );
    return rows[0];
  };

  export const getSubmissionsById = async (projectId: number): Promise<submission[]> =>{
    const { rows } = await query(
        `SELECT * FROM code_submissions
         WHERE projectId = $1`, 
         [projectId]
        );
        return rows;
  };

  export const findSubmissionById = async (id: number): Promise<submission | null> => {
    const { rows } = await query(
      `SELECT * FROM code_submissions
      WHERE id = $1`,
      [id],
    );
    return rows[0] || null;
  };

  export const deleteSubmissionById = async (id:number): Promise<submission | null> =>{
    const { rows} = await query(
        `DELETE FROM code_submissions WHERE id = $1 RETURNING *`,
        [id]
    );
    return rows[0] || null;
  }
