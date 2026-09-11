import { Notification, NotificationType } from "../../domain/entities/Notification";


export interface NotificationDocument {
  _id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationCreateData {
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: string;
  isRead: boolean;
}

export class NotificationMapper {
  static toDomain(
    document: NotificationDocument
  ): Notification {
    return new Notification(
      document._id,
      document.recipientId,
      document.type,
      document.title,
      document.message,
      document.referenceId,
      document.isRead,
      document.createdAt,
      document.updatedAt
    );
  }

  static toPersistence(
    notification: Notification
  ): NotificationCreateData {
    return {
      recipientId: notification.recipientId,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      referenceId: notification.referenceId,
      isRead: notification.isRead,
    };
  }
}