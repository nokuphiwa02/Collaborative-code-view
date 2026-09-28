import { Request , Response, NextFunction} from  "express"
import jwt from "jsonwebtoken"
import { findUserByEmail } from "../service/userService"
import { User } from "../types/user.types"

interface jwtPayload {
    userId: number,
    email: string
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){}
}