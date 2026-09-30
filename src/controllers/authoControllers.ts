import { Request, response, Response } from "express";
import * as userService from "../service/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "node:console";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !role || !name) {
    return res
      .status(400)
      .json({ message: "Email and password ,role, and name are required" });
  }
  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already exist" });
    }
    const user = await userService.createUser(email, password, role, name);
    res.status(201).json({ message: "user registered succesfully" });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({ message: "Error registering the user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log(`user & {email} logged in successfully`);
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error loging in" });
  }
};


export const getAllUsers = async (req: Request, res:Response) => {
  try{
    const users = await userService.findAllUsers();
    return res.status(200).json(users)
  }catch(error){
    return res.status(500).json({message:"Error retrieving user"});
  }
};

export const getUsersById = async (req:Request, res:Response) =>{
  try{
    const id =parseInt(req.params.id as string);
     const user = await userService.findUserById(id)
 
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
  }catch(error){
    res.status(500).json({message:"error retrieving user"})
  }
};

export const updateUserById = async(req: Request, res: Response) => {
  try{
  const id = parseInt (req.params.id as string)
  const updateUser = await userService.updateUser(id,req.body);
  if(!updateUser){
    return res.status(404).json({message:"user not found"});
     }
  res.status(200).json(updateUser)
  }catch(error){
 console.error(error)
 res.status(500).json({message:"error updating user"})
  }
};

export const deleteUserById = async(req:Request, res:Response) =>{
  try{
    const id = parseInt(req.params.id as string)
    const deleteUser = await userService.deleteUser(id)
    if(!deleteUser){
      return res.status(404).json({message:"user not found"});
    }
    res.status(200).json({message:" User Delete suceesfully"});
  }catch(error){
    res.status(500).json({message:"Error deleting application"})
  }
};
