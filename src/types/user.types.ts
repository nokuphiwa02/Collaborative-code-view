export type userRole = 'Review'| 'Submitter';

export interface User{
    id: number;
    email: string;
    name: string;
    role: userRole;
    password_hash: string;
}