export class WSC {
  ws: WebSocket;
  onevents: { event: string; callback: (data: any) => void }[] = [];

  constructor({ url }: { url: string }) {
    this.ws = new WebSocket(url);
    this.ws.onclose = () => {};
    this.ws.onopen = () => {};
    this.ws.onmessage = (e) => this.onmessage(e);
    this.onevents = [];
  }

  on(event: string, callback: (data: any) => void) {
    this.onevents.push({ event, callback });
  }

  onmessage(message: any) {
    const data = JSON.parse(message.data);
    this.onevents.forEach((event) => {
      if (event.event === data.type || event.event === "*") {
        event.callback(data);
      }
    });
  }

  send(message: any) {
    this.ws.send(JSON.stringify(message));
  }

  close() {
    this.ws.close();
  }
}
