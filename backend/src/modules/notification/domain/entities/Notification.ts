export enum NotificationType {
  COMPANY_REQUEST = "COMPANY_REQUEST",
}


export class Notification {
  constructor(
    public readonly id: string,
    public readonly recipientId: string,
    public readonly type: NotificationType,
    public readonly title: string,
    public readonly message: string,
    public readonly referenceId: string,
    public isRead: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  public markAsRead(): void {
    if (this.isRead) {
      return;
    }

    this.isRead = true;
    this.updatedAt = new Date();
  }
}