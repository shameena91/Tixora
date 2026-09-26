import { model, Schema } from "mongoose";

import {
  TimelineDocument,
} from "../../../application/mappers/TimelineMapper";

import {
  TimelineEntityType,
} from "../../../domain/entities/Timeline";

const timelineSchema =
  new Schema<TimelineDocument>(
    {
      entityType: {
        type: String,
        enum: Object.values(TimelineEntityType),
        required: true,
      },

      entityId: {
        type: String,
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      performedBy: {
        type: String,
        default: null,
      },

      metadata: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

timelineSchema.index({
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

export const TimelineModel =
  model<TimelineDocument>(
    "Timeline",
    timelineSchema
  );