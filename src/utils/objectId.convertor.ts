import { Types } from "mongoose";

export function convertToObjectIdArray(ids: string[]): Types.ObjectId[] {
  return ids.map((id) => new Types.ObjectId(id));
}

export function convertToObjectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}
