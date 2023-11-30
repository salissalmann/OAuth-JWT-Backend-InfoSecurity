import { Types } from "mongoose";

export interface IDiscipline {
  _id: Types.ObjectId;
  disciplineName: string;
  disciplineDescription: string;
  imageAltText: string;
  disciplineImage: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
