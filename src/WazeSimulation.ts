import PubSub from "./PubSub.ts";

// Definindo a interface TrafficEvent
interface TrafficEvent {
  type: string;
  location: string;
  details: string;
}

// Definindo a interface para os usuários
interface User {
  id: number;
  name: string;
  notify(event: TrafficEvent): void;
}

// Classe que implementa a interface User
class BasicUser implements User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  notify(event: TrafficEvent): void {
    console.log(
      `Notificação ${this.name}: ${event.type} em ${event.location} - ${event.details}`
    );
  }
}

// Instanciando o sistema PubSub
const pubSub = new PubSub();

// Função que representa um usuário que reporta um evento de trânsito
function reportTrafficEvent(event: TrafficEvent) {
  console.log("*".repeat(50));
  console.log(
    `Evento Reportado: ${event.type} em ${event.location} - ${event.details}`
  );
  console.log("*".repeat(50));
  pubSub.publish(event.location, event);
}

// Criando instâncias de usuários
const user1 = new BasicUser(1, "Usuário 1");
const user2 = new BasicUser(2, "Usuário 2");
const user3 = new BasicUser(3, "Usuário 3");
const user4 = new BasicUser(4, "Usuário 4");

// Armazenando as funções ligadas
const boundUser1Notify = user1.notify.bind(user1);
const boundUser2Notify = user2.notify.bind(user2);
const boundUser3Notify = user3.notify.bind(user3);
const boundUser4Notify = user4.notify.bind(user4);

// Inscrevendo os usuários para receber notificações de eventos em diferentes localizações
pubSub.subscribe("Centro", boundUser1Notify);
pubSub.subscribe("Centro", boundUser2Notify);
pubSub.subscribe("Centro", boundUser3Notify);
pubSub.subscribe("Centro", boundUser4Notify);

pubSub.subscribe("Rodovia", boundUser1Notify);
pubSub.subscribe("Rodovia", boundUser3Notify);

pubSub.subscribe("Subúrbio", boundUser1Notify);
pubSub.subscribe("Subúrbio", boundUser4Notify);

// Simulando a publicação de eventos de trânsito
reportTrafficEvent({
  type: "Acidente",
  location: "Centro",
  details: "Dois carros envolvidos, trânsito pesado.",
});
reportTrafficEvent({
  type: "Bloqueio de Estrada",
  location: "Rodovia",
  details: "Estrada fechada devido à construção.",
});
reportTrafficEvent({
  type: "Enchente",
  location: "Subúrbio",
  details: "Chuva forte causando alagamentos nas ruas.",
});

// Usuários cancelam a inscrição de eventos no Centro
pubSub.unsubscribe("Centro", boundUser1Notify);
pubSub.unsubscribe("Centro", boundUser2Notify);
pubSub.unsubscribe("Centro", boundUser4Notify);

// Novo evento no Centro
reportTrafficEvent({
  type: "Blitz Policial",
  location: "Centro",
  details: "Blitz policial, trânsito lento.",
});
