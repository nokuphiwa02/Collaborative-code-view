import { Request,Response } from "express";
import * as projectService from  "../service/projectService"

export const addProject = async (req: Request, res: Response) => {
    try{
     const newProject  = await projectService.createProject(req.body)
     res.status(201).json(newProject)   

        }catch(error){
            console.error("Project Creation error:" ,error);
            
            res.status(500).json({message:"Error in creating project"})
        }
    };

    
