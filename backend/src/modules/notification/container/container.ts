import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { NotificationCreateData, NotificationDocument } from "../application/mapper/NotificationMappers";
import { CreateNotification } from "../application/usecases/CreateNotification";
import { NotificationModel } from "../infrastructure/models/NotifiationModel";
import { NotificationRepository } from "../infrastructure/repository/NotificationRepository";

const baseNotificationRepository =
  new BaseRepository<
    NotificationDocument,
    NotificationCreateData
  >(NotificationModel);

const notificationRepository =
  new NotificationRepository(
    baseNotificationRepository
  );

const createNotification =
  new CreateNotification(
    notificationRepository
  )