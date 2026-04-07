import type { BaseModel } from "./baseModel";

export interface Notification extends BaseModel{
    notificationMessage: string;
    receiverId: string;
}

export interface NotificationInput {
  notificationMessage: string;
  receiverId: string;
}
