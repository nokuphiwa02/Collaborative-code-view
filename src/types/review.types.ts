import e from "express";

export interface review {
  id: number;
  submissionId: number;
  userId: number;
  content: string;
  rating: number;
}

export type NewReview = Omit<review, "id">;