import { IRolesSchema } from '@/interfaces/userRoles.interface'
import { Schema, model } from 'mongoose';

export const DOCUMENT_NAME = 'Roles';
export const COLLECTION_NAME = 'userRoles';

export enum Role {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
}

const RolesSchema = new Schema<IRolesSchema>(
    {
        roleId: {
            type: Number,
        },
        roleName: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            enum: Object.values(Role),
        },
        userIds: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "User"
        },
        createdAt: {
            type: Schema.Types.Date,
            default: Date.now,
            //expires: 30 * 86400,
        },
    },
    {
        versionKey: false,
    },
);


RolesSchema.pre('save', async function (next) {
    const doc = this as IRolesSchema;

    if (!doc.isNew) {
        return next();
    }
    const highestRoleId = await model('Roles').find().sort({ roleId: -1 }).limit(1);
    doc.roleId = highestRoleId.length > 0 ? highestRoleId[0].roleId + 1 : 1;

    next();
});

export const RolesModel = model(DOCUMENT_NAME, RolesSchema, COLLECTION_NAME);
