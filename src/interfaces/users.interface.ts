import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    roles?: Types.ObjectId[];
    addedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPasswordChangeInfo {
    oldPassword: string;
    newPassowrd: string;
    updatedAt: Date;
}