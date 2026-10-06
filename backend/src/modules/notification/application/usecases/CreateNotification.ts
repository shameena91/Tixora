import { randomUUID } from "crypto";

import { Notification } from "../../domain/entities/Notification";
import { NotificationType } from "../../domain/entities/Notification";

import { INotificationRepository } from "../../domain/repositories/INotificationrepository";

export interface CreateNotificationData {
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: string;
}

export class CreateNotification {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(
    data: CreateNotificationData
  ): Promise<Notification> {

    const notification = new Notification(
      randomUUID(),
      data.recipientId,
      data.type,
      data.title,
      data.message,
      data.referenceId,
      false,
      new Date(),
      new Date()
    );

    return await this.notificationRepository.create(
      notification
    );
  }
}