import { Request, Response} from "express";
import * as submissionService from "../service/submissionService";

export const addSubmissions = async(req: Request, res: Response) => {
    try{
        const newSubmission = await submissionService.createSubmission(req.body);
        res.status(201).json(newSubmission);
    }catch(error){
        console.error("Submission Creation error:", error);

        res.status(500).json({message:"Error in creating submission"});
    }
};

export const getSubmissionsByProject = async(req:Request, res: Response) =>{
 try{
  const id = parseInt(req.params.id as string);
    const submissions = await submissionService.getSubmissionsById(id);
    res.status(200).json(submissions);
 }catch(error){
    console.error("Error fetching submissions:",error);
    res.status(500).json({messsage:"Error fetching submissions"});
  }
};

export const deleteSubmissionById = async(req:Request, res: Response) =>{
    try{
      const id = parseInt(req.params.id as string);
      const deleteSubmission = await submissionService.deleteSubmissionById(id);
      if(!deleteSubmission){
        return res.status(404).json({message:"submission not found"});
      }
      res.status(200).json({message:"submission deleted successfully"});
    }catch(error){
      console.error("Error deleting submission:",error);
      res.status(500).json({message:"Error deleting submission"});
    }
};