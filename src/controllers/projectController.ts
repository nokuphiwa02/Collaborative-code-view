import { Request, Response } from "express";
import * as projectService from "../service/projectService";

export const addProject = async (req: Request, res: Response) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
   
    console.error("Project Creation error:", error);

    res.status(500).json({ message: "Error in creating project" });
  }
};

export const assignMembersToProject = async (req: Request, res: Response) => {
    try{
        const {id } = req.params;
        const { userId } = req.body;

        const project = await projectService.assignMembersToProject(Number(id), userId);

        res.status(201).json(project);
        

    }catch(error){
        console.error("Error assigning member to project:", error);
        res.status(500).json({ message: "Error assigning member to project" });
    }
    };


export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProject();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ message: "Error retrieving Projects" });
  }
};
