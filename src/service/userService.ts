import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { User, userRole } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] || null;
};

export const createUser = async (email: string,password: string,name: string,role: string,
): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const { rows } = await query(
    "INSERT INTO users (email, password_hash,name, role) VALUES ($1, $2,$3,$4) RETURNING id ,email,name,role",
    [email, password_hash, role, name],
  );
  return rows[0];
};

export const findAllUsers = async (): Promise<User[]> => {
  const { rows } = await query(
    "SELECT id, email, name, role, created_at FROM users ORDER BY id ASC",
  );
  return rows;
};
export const findUserById = async (id: number): Promise<User | null> => {
  const { rows } = await query("SELECT * FROM users WHERE id= $1", [id]);
  return rows[0] || null;
};

export const updateUser = async (id: number, appData: User): Promise<User | null> => {
    const {email,name,role,password_hash} = appData
  const { rows } = await query( `UPDATE users 
    SET name = COALESCE($1,name), 
    email = COALESCE($2,email)  ,
    password_hash = COALESCE($3,password_hash),
    role = COALESCE($4,role)
    WHERE id = $5 
    RETURNING *`,
    [email,name,role,password_hash,id],
  );
  return rows[0] || null;
};

export const deleteUser = async(id:number): Promise<User | null> => {
    const { rows } = await query (
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    );
    return rows [0] || null
}
