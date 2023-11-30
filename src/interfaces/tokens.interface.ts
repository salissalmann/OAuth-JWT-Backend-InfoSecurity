import { Types } from "mongoose";

export interface ITokensSchema {
    userid: Types.ObjectId;
    refreshToken: string;
    accessToken: string;
    createdAt?: Date;
}