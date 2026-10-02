export type submission_status = "pending" | "approved" | "rejected";

export interface submission {
    id: number;
    projectId: number;
    code_status: submission_status;
};

export type NewSubmission = Omit<submission, "id">;