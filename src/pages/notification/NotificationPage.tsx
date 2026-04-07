// NotificationPage.tsx
import { useEffect, useState } from "react";
import { notificationHub } from "../../services/notificationHubService";
import type { Notification } from "../../models/notification";

export default function NotificationPage() {
  // Initial notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", receiverId: "user-1", createdAt: new Date(), updateAt: new Date(), notificationMessage: "Initial Notification 1" },
    { id: "2", receiverId: "user-2", createdAt: new Date(), updateAt: new Date(),  notificationMessage: "Initial Notification 2" },
  ]);

  // Helper to append a notification safely (no duplicates)
  const addNotification = (notif: Notification) => {
    setNotifications((prev) => {
      if (prev.find((n) => n.id === notif.id)) return prev; // Avoid duplicate
      return [...prev, notif];
    });
  };

  useEffect(() => {
    const initHub = async () => {
      await notificationHub.start();

      // Attach listeners once
      notificationHub.onPersonal(addNotification);
      notificationHub.onClients(addNotification);
      notificationHub.onBroadcast(addNotification);
    };

    initHub();
  }, []);

  // Server calls
  const sendPersonal = ( message: string, receiverId: string) =>
    notificationHub.sendPersonalAsync({ notificationMessage: message, receiverId: receiverId });

  const sendGroup = () =>
    notificationHub.sendToClientsAsync("Hey mga clients, update haha");

  const sendBroadcast = () =>
    notificationHub.sendBroadcastAsync({ notificationMessage: "Broadcast message", receiverId: "user-123" });

  return (
    <div>
      <h2>Notifications</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => {
          sendPersonal("from calzoshainepaul@gmail.com message","1c98ee7f-ea5b-4a29-a063-533c7d8eae9b")
        }}>Send to User 1 shainepaulm@gmail.com</button>
        <button onClick={() => {
          sendPersonal("from shainepaulm@gmail.com message","850bd722-a497-4492-b408-eff8ae84350f")
        }}>Send to user 2 calzoshainepaul@gmail.com</button>
        
        <button onClick={sendGroup}>Send Group</button>
        <button onClick={sendBroadcast}>Send Broadcast</button>
      </div>

      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            {n.notificationMessage} (Receiver: {n.receiverId})
          </li>
        ))}
      </ul>
    </div>
  );
}