/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Socket } from "socket.io-client";
import { User, Message } from "../../interfaces";

type State = {
  socket: Socket | null;
  assignedManagerID: string;
  currentUserID: string;
  messages: Message[];
  users: User[];
};

type Actions = {
  updateUsers: (user: User) => void;
  updateMessages: (message: Message) => void;
  setAssignedManagerID: (assignedManagerID: string) => void;
  setCurrentUserID: (currentUserID: string) => void;
  setSocket: (socket: Socket) => void;
};

// Zustand store
const useStore = create<State & Actions>()(
  immer(
    devtools((set) => ({
      socket: null,
      assignedManagerID: "",
      currentUserID: "",
      users: [],
      messages: [],
      updateUsers: (user) =>
        set((state) => void state.users.push(user), false, "updateUsers"),
      updateMessages: (message) =>
        set(
          (state) => {
            const dublicateMessage = [...state.messages].find(
              (item) => item.id === message.id
            );

            if (!dublicateMessage) state.messages.push(message);
          },
          false,
          "updateMessages"
        ),
      setAssignedManagerID: (assignedManagerID) =>
        set(
          (state) => void (state.assignedManagerID = assignedManagerID),
          false,
          "setAssignedManagerID"
        ),
      setCurrentUserID: (currentUserID) =>
        set(
          (state) => void (state.currentUserID = currentUserID),
          false,
          "setCurrentUserID"
        ),
      setSocket: (socket) =>
        set(
          (state) => {
            return {
              ...state,
              socket,
            };
          },
          false,
          "setSocket"
        ),
    }))
  )
);

export default useStore;
