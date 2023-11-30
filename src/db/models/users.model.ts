import { Schema, model, } from 'mongoose';
import { IUser } from '@interfaces/users.interface';
import { string } from 'joi';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

const userSchema = new Schema<IUser>(
    {
        firstName:
        {
            type: Schema.Types.String,
            trim: true,
            maxlength: 200,
        },
        lastName:
        {
            type: Schema.Types.String,
            trim: true,
            maxlength: 200,
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            sparse: true,
            trim: true,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            select: false,
        },
        phoneNumber: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 20,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role',
                default: [],
            },
        ],
        addedBy: {
            type: Schema.Types.String,
        },
        createdAt: {
            type: Schema.Types.Date,
            required: false,
            select: false,
            default: Date.now,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: false,
            select: false,
        },
    },
    {
        versionKey: false,
    },
);

userSchema.index({ email: 1 });

export const UserModel = model<IUser>(
    DOCUMENT_NAME,
    userSchema,
    COLLECTION_NAME
);