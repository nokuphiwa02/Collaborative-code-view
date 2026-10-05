export type comment_type = "General" | "Inline";

export interface comment {
  id: number;
  submissionId: number;
  userId: number;
  content: string;
  type: comment_type;
};

export type NewComment = Omit<comment, "id">;