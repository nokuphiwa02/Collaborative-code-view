import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { project, submission_status, NewProject } from "../types/project.types";

export const createProject = async (appData: NewProject): Promise<project> => {
  const { userId, name, project_status } = appData;
  const { rows } = await query(
    `INSERT INTO projects(userId, name, project_status)VALUES($1,$2,$3)RETURNING *`,
    [userId, name, project_status],
  );
  return rows[0];
};

export const findAllProject = async (): Promise<project[]> => {
  const { rows } = await query(
    "SELECT * FROM projects ORDER BY created_at DESC",
  );
  return rows;
};

export const assignMembersToProject = async (memberId: number, projectId: number) :Promise<project | null> =>{
    const {rows } = await query(
        `UPDATE projects SET assigned_members = array_append(COALESCE(assigned_members, '{}'), $1)  WHERE id = $2 RETURNING *`,
        [memberId, projectId]
    );
    return rows[0] || null  
};
