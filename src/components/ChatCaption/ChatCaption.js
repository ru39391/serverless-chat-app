import React from 'react';

function ChatCaption({ userList }) {
  const [Caption, setCaption] = React.useState('Ожидаем подключения других пользователей');

  React.useEffect(() => {
    setCaption(`Пользователей в сети: ${userList.length + 1}`);
  }, [userList]);

  return (
    <h4 className="text-muted mb-0">{Caption}</h4>
  );
}

export default ChatCaption;
