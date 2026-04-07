import type { NotificationInput, Notification } from "../models/notification";
import { BaseHubService } from "./BaseHubService";
// Hub events
interface NotificationHubClientEvents {
    // Server → Client
    PersonalNotificationReceived: (notif: Notification) => void;
    ClientsNotificationReceived: (notif: Notification) => void;
    BroadcastNotificationReceived: (notif: Notification) => void;
}
interface NotificationHubServerMethods {
    // Client → Server
    SendNotificationAsync: (input: NotificationInput) => Promise<void>;
    SendToClientsNotificationAsync: (message: string) => Promise<void>;
    SendBroadcastNotificationAsync: (input: NotificationInput) => Promise<void>;
}

export class NotificationHubService extends BaseHubService<NotificationHubClientEvents,NotificationHubServerMethods> {
    constructor() {
        super("/hub/notification");
    }

    // ===== CLIENT EVENTS =====
    onPersonal(callback: (notif: Notification) => void) {
        this.on("PersonalNotificationReceived", callback);
    }

    onClients(callback: (notif: Notification) => void) {
        this.on("ClientsNotificationReceived", callback);
    }

    onBroadcast(callback: (notif: Notification) => void) {
        this.on("BroadcastNotificationReceived", callback);
    }

    // ===== SERVER METHODS =====
    async sendPersonalAsync(input: NotificationInput) {
        return this.invoke("SendNotificationAsync", input);
    }

    async sendToClientsAsync(message: string) {
        return this.invoke("SendToClientsNotificationAsync", message);
    }

    async sendBroadcastAsync(input: NotificationInput) {
        return this.invoke("SendBroadcastNotificationAsync", input);
    }
}

export const notificationHub = new NotificationHubService();