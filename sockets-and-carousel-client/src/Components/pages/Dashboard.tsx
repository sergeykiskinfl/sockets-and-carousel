import { useState } from "react";
import ChatInput from "../ChatInput";
import UserMessage from "../UserMessage";
import UserCard from "../UserCard";
import useStore from "../../store";

// Страница-панель менеджера
export default function Dashboard(): JSX.Element {
  const [users, messages, assignedManagerID, currentUserID] = useStore(
    (state) => [
      state.users,
      state.messages,
      state.assignedManagerID,
      state.currentUserID,
    ]
  );
  const [currentChatUserID, setCurrentChatUserID] = useState<string | null>(
    null
  );

  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const usersIdsWithMessages = Array.from(
    new Set(
      [...sortedMessages]
        .filter((message) => message.senderId !== assignedManagerID)
        .map((message) => message.senderId)
    )
  );

  const usersWithLastMessage = usersIdsWithMessages.map((id) => {
    const lastMessage = sortedMessages.find(
      (message) => message.senderId === id
    );

    return [id, lastMessage?.content];
  });

  const currentMessages = [...sortedMessages].filter(
    (message) =>
      message.senderId === currentChatUserID ||
      (message.senderId === assignedManagerID &&
        message.receiverId === currentChatUserID)
  );

  console.log("usersWithLastMessage === ", usersWithLastMessage);

  function handleUserListClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const userBlock = target.closest("div.user-card") as HTMLElement;

    if (!userBlock || !userBlock.dataset.id) return;

    setCurrentChatUserID(userBlock.dataset.id);
  }

  return (
    <div className="flex h-full min-w-[800px] bg-[#f1f3f5]">
      {assignedManagerID !== currentUserID ? (
        <p className="placeholder-message text-xl">
          Менеджером, который может общаться со всеми пользователями,
          назначается только первое открытое окно
        </p>
      ) : (
        <>
          <div className="user-list" onClick={(e) => handleUserListClick(e)}>
            {messages.length === 0 ? (
              <p className="placeholder-message">Нет активных чатов</p>
            ) : (
              usersWithLastMessage.map((userTuple) => {
                const renderUser = users.find(
                  (user) => user.id === userTuple[0]
                );

                const { id, avatarURL, name } = renderUser!;

                return (
                  <UserCard
                    key={id}
                    id={id}
                    name={name}
                    message={userTuple[1]!}
                    avatarUrl={avatarURL}
                    current={id === currentChatUserID ? true : false}
                  />
                );
              })
            )}
          </div>
          <div className="block flex-1 h-full relative">
            <div className="user-message-dashboard-outer-container">
              {/* <div className="user-message-container user-message-container-dashboard"> */}
              {currentMessages.length === 0 || !currentChatUserID ? (
                <p className="placeholder-message">Нет сообщений</p>
              ) : (
                <div className="user-message-container user-message-container-dashboard">
                  {currentMessages.map((message) => {
                    const user = users.find(
                      (item) => item.id === message.senderId
                    )!;

                    const { avatarURL, id } = user;

                    return (
                      <UserMessage
                        key={message.id}
                        selfMessage={currentUserID === id ? true : false}
                        avatarUrl={avatarURL}
                      >
                        {message.content}
                      </UserMessage>
                    );
                  })}
                </div>
              )}
              {/* </div> */}
            </div>
            <ChatInput kindOfSender="manager" receiverId={currentChatUserID!} />
          </div>
        </>
      )}
    </div>
  );
}
