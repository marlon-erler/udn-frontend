type Callback = () => void;

export class UDNFrontend {
  private ws: WebSocket | undefined;

  // handlers
  private connectionHandler: Callback = () => null;
  private disconnectionHandler: Callback = () => null;
  private messageHandler: Callback = () => null;

  // init
  set onconnect(handler: Callback) {
    this.connectionHandler = handler;
  }
  set ondisconnect(handler: Callback) {
    this.disconnectionHandler = handler;
  }
  set onmessage(handler: Callback) {
    this.messageHandler = handler;
  }

  // utility methods
  private send(messageObject: Object): boolean {
    if (this.ws == undefined) return false;

    const messageString = JSON.stringify(messageObject);
    this.ws.send(messageString);
    return true;
  }

  // public methods
  connect(address: string): void {
    this.ws = new WebSocket(address);
    this.ws.addEventListener("open", this.connectionHandler);
    this.ws.addEventListener("close", this.disconnectionHandler);
    this.ws.addEventListener("message", this.messageHandler);
  }

  sendMessage(channel: string, body: string): boolean {
    const messageObject = {
      messageChannel: channel,
      messageBody: body,
    };
    return this.send(messageObject);
  }

  subscribe(channel: string): boolean {
    const messageObject = {
      subscribeChannel: channel,
    };
    return this.send(messageObject);
  }

  unsubscribe(channel: string): boolean {
    const messageObject = {
      unsubscribeChannel: channel,
    };
    return this.send(messageObject);
  }
}

class myFrontend extends UDNFrontend {}
