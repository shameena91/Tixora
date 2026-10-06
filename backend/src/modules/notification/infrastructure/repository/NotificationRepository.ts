import { BaseRepository } from "../../../../infrastructure/repositories/Baserepository";

import {
  NotificationCreateData,
  NotificationDocument,
  NotificationMapper,
} from "../../application/mapper/NotificationMappers";

import { Notification } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../../notification/domain/repositories/INotificationrepository";

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

  async findOne(
    filter: Partial<Notification>
  ): Promise<Notification | null> {
    const notificationDocument =
      await this.baseRepository.findOne(filter);

    if (!notificationDocument) {
      return null;
    }

    return NotificationMapper.toDomain(
      notificationDocument
    );
  }

  async findAll(
    filter?: Partial<Notification>,
    sort?: Record<string, 1 | -1>
  ): Promise<Notification[]> {
    const notificationDocuments =
      await this.baseRepository.findAll(
        filter,
        sort
      );

    return notificationDocuments.map(
      NotificationMapper.toDomain
    );
  }

  async update(
    filter: Partial<Notification>,
    data: Partial<Notification>
  ): Promise<Notification | null> {
    const notificationDocument =
      await this.baseRepository.update(
        filter,
        data
      );

    if (!notificationDocument) {
      return null;
    }

    return NotificationMapper.toDomain(
      notificationDocument
    );
  }
}