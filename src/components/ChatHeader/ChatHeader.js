import React from 'react';
import { Button } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';
import { getObjectKey } from '../../utils/constants';

function ChatCaption({ userList, currentUser, signOut }) {
  const userName = Object.values(currentUser)[0];

  function logout() {
    signOut();
  }

  return (
    <div className="chat__header d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-bottom px-4 py-3">
      <h4 className="text-muted mb-2 mb-sm-0">{userList.length ? `Пользователей в сети: ${userList.length + 1}` : 'Ожидаем подключения других пользователей'}</h4>
      <div className="d-flex align-items-md-center">
        <div className="d-flex flex-column text-end order-2 order-sm-1 me-sm-3">
          <span className="fs-5">{userName}</span>
          <Button className="text-muted text-end p-0" variant="link" size="sm" onClick={logout}>Выйти</Button>
        </div>
        <span className="user-avatar user-avatar_inverted d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle order-1 order-sm-2 p-2 me-3 me-sm-0">
          <Person />
        </span>
      </div>
    </div>
  );
}

export default ChatCaption;
