import { Connection, Model, Schema } from "mongoose";
import { CategoryStatus } from "../../../domain/entities/Category";

export interface CategoryDocument{
    _id: string,
         departmentId: string,
        name: string,
         description: string | null,
        status: CategoryStatus,
         createdAt: Date,
        updatedAt: Date,
      
}

const categorySchema=new Schema<CategoryDocument>(
    {
        name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
     description: {
      type: String,
      default: null,
      trim: true,
    },departmentId: {
      type: String,
      default: null,
    },
    status: {
          type: String,
          enum: Object.values(CategoryStatus),
          required: true,
          default: CategoryStatus.ACTIVE,
          index: true,
        },

    },
    {
    timestamps: true,
    versionKey: false,
  },
)
categorySchema.index({ departmentId: 1, name: 1 });

export const getCategoryModel = (
  connection: Connection,
): Model<CategoryDocument> => {
  const existingModel = connection.models.Category as
    | Model<CategoryDocument>
    | undefined;

  return (
    existingModel ??
    connection.model<CategoryDocument>(
      "Category",
      categorySchema,
    )
  );
};