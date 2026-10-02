import { Request, Response} from "express";
import * as submissionService from "../service/submissionService";

export const addSubmission = async(req: Request, res: Response) => {
    try{
        const newSubmission = await submissionService.createSubmission(req.body);
        res.status(201).json(newSubmission);
    }catch(error){
        console.error("Submission Creation error:", error);

        res.status(500).json({message:"Error in creating submission"});
    }
};