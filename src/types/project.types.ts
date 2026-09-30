export type submission_status =
  | "pending"
  | "rejected"
  | "Approved"
  | "in_review";

export interface project {
  id: number;
  userId: number[];
  name: string;
  project_status: submission_status;
}

export type NewProject = Omit<project, "id" | " project_status">;
