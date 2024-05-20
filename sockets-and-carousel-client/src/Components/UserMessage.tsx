type Props = {
  children: React.ReactNode;
  selfMessage?: boolean;
  avatarUrl: string;
};

// Сообщение пользователя
export default function UserMessage({
  children,
  selfMessage = true,
  avatarUrl,
}: Props): JSX.Element {
  
  console.log('avatarUrl', avatarUrl);

  return (
    <div className="flex flex-row items-end">
      <div
        className="w-6 h-6 -mr-3.5 rounded-full z-20"
        style={{
          backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}`,
          backgroundImage: `url(${avatarUrl})`,
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="w-4 h-6 -mr-2 rounded-full bg-[#f1f3f5] z-10"></div>
      <div
        className="w-2 h-3"
        style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
      />
      <div
        className="user-message"
        style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
      >
        {children}
      </div>
    </div>
  );
}
