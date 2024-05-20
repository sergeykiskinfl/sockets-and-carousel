// Общие интерфейсы для клиента и сервера
export interface ServerToClientEvents {
  assignManager: (managerID: string, id: string, user: User) => void;
  setNewUser: (user: User) => void;
  receiveMessage: (message: Message) => void;
}

export interface ClientToServerEvents {
  initUser: (user: PartialUser) => void;
  sendMessage: (message: Message) => void;
}

export interface PartialUser {
  avatarURL: string;
  name: string;
}

export interface User extends PartialUser {
  id: string;
  status: "manager" | "user";
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
  content: string;
  kindOfSender: "manager" | "user";
};
