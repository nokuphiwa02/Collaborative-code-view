import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { project, submission_status ,NewProject} from "../types/project.types";


export const createProjectTable = async(): Promise<void> => {
const { rows } = await query (
`CREATE TABLE IF NOT EXISTS projects(
id SERIAL PRIMARY KEY,
userId INT[] REFERENCES users(id) ON DELETE CASCADE,
name VARCHAR(200) NOT NULL,
project_status submission_status DEFAULT 'Pending'
)`
)
try{
console.log("projects table created successfully")
}catch(error){
console.log("failed to create table")
}
};

export const createProject = async(appData: NewProject) : Promise<project> => {
    const {userId, name ,project_status} = appData
    const { rows } = await query(`INSERT INTO projects(userId, name, project_status)VALUES($1,$2,$3)RETURNING *`,
        [userId,name,project_status]
    )
    return rows [0];
}