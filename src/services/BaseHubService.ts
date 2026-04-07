import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getAuthToken } from "../utils/authStorage";

// BaseHubService with strongly typed events and methods
export class BaseHubService<
  TEvents extends { [K in keyof TEvents]: (...args: any[]) => void },
  TMethods extends { [K in keyof TMethods]: (...args: any[]) => Promise<any> }
> {
  protected connection: HubConnection;

  constructor(url: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(url, { accessTokenFactory: () => getAuthToken() ?? "" })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();
  }

  async start() {
    if (this.connection.state === "Connected" || this.connection.state === "Connecting" || this.connection.state === "Reconnecting") {
      return; // Already starting or started
    }
    try {
      await this.connection.start();
      console.log("SignalR connected");
    } catch (error) {
      console.error("SignalR connection failed:", error);
      setTimeout(() => this.start(), 5000);
    }
  }
  async stop() {
    await this.connection.stop();
  }

  /** Strongly typed listener (server → client) */
  protected on<K extends keyof TEvents>(method: K, callback: TEvents[K]) {
    this.connection.on(
      method as string,
      (...args: Parameters<TEvents[K]>) => {
        callback(...(args as Parameters<TEvents[K]>));
      }
    );
  }

  /** Strongly typed invoke (client → server) */
  protected invoke<K extends keyof TMethods>(
    method: K,
    ...args: Parameters<TMethods[K]>
  ): ReturnType<TMethods[K]> {
    return this.connection.invoke(method as string, ...args) as ReturnType<TMethods[K]>;
  }
}