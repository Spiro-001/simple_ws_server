import { WebSocketServer } from "ws";

export default function eventPlugin({ wss }: { wss: WebSocketServer }) {
  return {
    name: "event-plugin",
    setup(build) {
      build.onEnd(() => {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send("change");
          }
        });
      });
    },
  };
}
