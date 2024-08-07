interface Subscriber {
  (message: any): void;
}

class PubSub {
  private topics: { [key: string]: Subscriber[] } = {};

  subscribe(topic: string, subscriber: Subscriber): void {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(subscriber);
  }

  unsubscribe(topic: string, subscriber: Subscriber): void {
    if (!this.topics[topic]) return;
    this.topics[topic] = this.topics[topic].filter((sub) => sub != subscriber);
  }

  publish(topic: string, message: any): void {
    if (!this.topics[topic]) return;
    this.topics[topic].forEach((subscriber) => subscriber(message));
  }
}

export default PubSub;
