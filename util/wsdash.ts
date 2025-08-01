import WebSocket, { WebSocketServer } from "ws";
import uuid4 from "uuid4";

export class WSDashboard {
  clients: { client: WebSocket; req: any }[] = [];
  internal_clients: { client: WebSocket; req: any }[] = [];

  constructor({ WS_DASH_PORT }: { WS_DASH_PORT: number }) {
    const wss_dash = new WebSocketServer({ port: WS_DASH_PORT });

    wss_dash.on("connection", (ws: WebSocket, req: any) => {
      this.add(ws, req, true);
      this.broadcast({
        type: "init",
        data: this.clients.map((c) => this.slim(c.client, c.req)),
      });
      ws.on("close", () => {
        this.removeInternal(ws);
      });
    });
  }

  broadcast(message: any) {
    this.internal_clients.forEach(({ client }) => {
      this.send(client, message);
    });
  }

  send(client: WebSocket, message: any) {
    const timestamp = new Date().toISOString();
    const id = uuid4();
    client.send(JSON.stringify({ ...message, timestamp, id }));
  }

  remove(client: WebSocket) {
    const req = this.clients.find((c) => c.client === client)?.req;
    const data = this.slim(client, req);
    this.clients.splice(
      this.clients.findIndex((c) => c.client === client),
      1
    );
    this.broadcast({ type: "client::remove", data });
  }

  add(client: WebSocket, req: any, internal?: boolean) {
    if (internal) return this.internal_clients.push({ client, req });
    const id = uuid4();
    (client as any).id = id;
    this.clients.push({ client, req });
    const data = this.slim(client, req);
    this.broadcast({ type: "client::add", data });
  }

  removeInternal(client: WebSocket) {
    this.internal_clients.splice(
      this.internal_clients.findIndex((c) => c.client === client),
      1
    );
  }

  slim(client: WebSocket, req: any) {
    const id = (client as any).id;
    const ip = req.socket.remoteAddress;
    return {
      id,
      ip,
    };
  }
}
