import React from 'react';

function ChatCaption({ userList }) {
  return (
    <div className="chat__header border-bottom px-4 py-3">
      <h4 className="text-muted mb-0">{userList.length ? `Пользователей в сети: ${userList.length + 1}` : 'Ожидаем подключения других пользователей'}</h4>
    </div>
  );
}

export default ChatCaption;
