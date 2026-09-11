import { BaseRepository } from "../../../../infrastructure/repositories/Baserepository";

import {
  NotificationCreateData,
  NotificationDocument,
  NotificationMapper,
} from "../../application/mapper/NotificationMappers"

import { Notification } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../../notification/domain/repositories/INotificationrepository";

import { NotificationModel } from "../models/NotifiationModel";

export class NotificationRepository
  implements INotificationRepository
{
  private readonly baseRepository: BaseRepository<
    NotificationDocument,
    NotificationCreateData
  >;

  constructor(
    baseRepository: BaseRepository<
      NotificationDocument,
      NotificationCreateData
    >
  ) {
    this.baseRepository = baseRepository;
  }

  async create(
    notification: Notification
  ): Promise<Notification> {

    // Domain → Persistence
    const persistenceData =
      NotificationMapper.toPersistence(notification);

    // Save through BaseRepository
    const notificationDocument =
      await this.baseRepository.create(persistenceData);

    // Persistence → Domain
    return NotificationMapper.toDomain(
      notificationDocument
    );
  }

  async findById(
    id: string
  ): Promise<Notification | null> {

    const notificationDocument =
      await this.baseRepository.findById(id);

    if (!notificationDocument) {
      return null;
    }

    return NotificationMapper.toDomain(
      notificationDocument
    );
  }

  async findAll(): Promise<Notification[]> {

    const notificationDocuments =
      await this.baseRepository.findAll();

    return notificationDocuments.map(
      NotificationMapper.toDomain
    );
  }
}