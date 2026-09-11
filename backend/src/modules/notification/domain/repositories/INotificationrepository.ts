import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";

import { Notification } from "../entities/Notification";
export interface INotificationRepository
  extends IBaseRepository<Notification> {}