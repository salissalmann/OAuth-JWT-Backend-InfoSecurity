import { ObjectId } from "mongodb";

export interface IRolesSchema {
    _id: { type: ObjectId };
    roleId: number;
    roleName: string;
    userIds: Array<ObjectId>;
    createdAt?: Date;
    isNew: | boolean | undefined;
}
