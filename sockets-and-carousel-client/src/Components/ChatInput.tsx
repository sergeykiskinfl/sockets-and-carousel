import { useState, useRef } from "react";
import useStore from "../store";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../../../interfaces";

// Поле инпута для чата
export default function ChatInput({
  kindOfSender = "user",
  receiverId,
}: {
  kindOfSender?: "manager" | "user";
  receiverId?: string;
}): JSX.Element {
  const [messageContent, setMessageContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [updateMessages, socket, currentUserID, assignedManagerID] = useStore(
    (state) => [
      state.updateMessages,
      state.socket,
      state.currentUserID,
      state.assignedManagerID,
    ]
  );

  function handleUserInputChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    setMessageContent(target.value);
  }

  return (
    <form
      className="chat-input-container"
      onSubmit={async (e) => {
        e.preventDefault();
        
        if (messageContent.length > 0) {
          const message: Message = {
            id: uuidv4(),
            content: messageContent,
            kindOfSender,
            timestamp: Date.now(),
            senderId: currentUserID,
            receiverId: receiverId ?? assignedManagerID,
          };

          updateMessages(message);
          socket?.emit("sendMessage", message);
          inputRef.current!.value = "";
          setMessageContent("");
        }
      }}
    >
      <input
        className="flex-1 text-[#77828C] pl-4 text-sm"
        maxLength={80}
        placeholder="Написать сообщение..."
        onChange={(e) => handleUserInputChange(e)}
        ref={inputRef}
      />
      <button className="h-full w-12 px-4" type="submit">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "-3px" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.9486 6.31623C19.0739 5.94035 18.9655 5.52595 18.6721 5.25962C18.3788 4.9933 17.9559 4.92528 17.5938 5.08619L4.92082 10.7186C3.61718 11.298 3.78221 13.1986 5.16622 13.5446L7.2927 14.0762C7.9053 14.2293 8.55425 14.0842 9.04323 13.6847L14.4913 9.23313C14.6777 9.08083 14.9248 9.32696 14.7732 9.51395L10.7598 14.4648C10.2656 15.0744 10.1736 15.9167 10.5246 16.6187L11.899 19.3675C12.4967 20.5628 14.2411 20.4388 14.6637 19.1711L18.9486 6.31623Z"
            fill={`${messageContent.length > 0 ? "#798FFF" : "#A3A7BF"}`}
          />
        </svg>
      </button>
    </form>
  );
}
