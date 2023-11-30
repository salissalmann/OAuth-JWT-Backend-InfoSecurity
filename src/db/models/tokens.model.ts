import { ITokensSchema } from '../../interfaces/tokens.interface';
import { Schema, model, } from 'mongoose';

export const DOCUMENT_NAME = 'Tokens';
export const COLLECTION_NAME = 'usersToken';

const UserTokensSchema = new Schema<ITokensSchema>(
    {
        userid: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        refreshToken: {
            type: Schema.Types.String,
            required: true,
        },
        accessToken: {
            type: Schema.Types.String,
        },
        createdAt: {
            type: Schema.Types.Date,
            default: Date.now,
            expires: 30 * 86400
        },
    },
    {
        versionKey: false,
    },
);

UserTokensSchema.index({ userid: 1 });

export const UserTokensModel = model<ITokensSchema>(DOCUMENT_NAME, UserTokensSchema, COLLECTION_NAME);
