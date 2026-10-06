import mongoose, { Schema, model } from "mongoose";
import { NotificationType } from "../../domain/entities/Notification";
import { NotificationDocument } from "../../application/mapper/NotificationMappers";

const notificationSchema = new Schema(
  {
    recipientId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
isRead: {
  type: Boolean,
  default: false,
  required: true,
},
    referenceId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  notificationSchema
);