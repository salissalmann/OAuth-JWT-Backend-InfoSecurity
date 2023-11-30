import { Schema, model } from "mongoose";
import { IDiscipline } from "@/interfaces/discipline.interface";

export const DOCUMENT_NAME = "Discipline";
export const COLLECTION_NAME = "disciplines";

const disciplineSchema = new Schema<IDiscipline>(
  {
    disciplineName: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    disciplineDescription: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    disciplineImage: {
      type: Schema.Types.String,
      trim: true,
    },
    imageAltText: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: false,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: false,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

disciplineSchema.index({ _id: 1, status: 1 });
disciplineSchema.index({ DisciplineName: 1 });

export const DisciplineModel = model<IDiscipline>(
  DOCUMENT_NAME,
  disciplineSchema,
  COLLECTION_NAME
);
