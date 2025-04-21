export interface IUsers{
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    imagePath: string;
    isActivated: boolean;
    creationDate: string; // ISO date format
    modificationDate: string; // ISO date format
} 