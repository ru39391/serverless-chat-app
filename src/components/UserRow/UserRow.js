import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

function UserRow({ id, name, index, currentUser, getUserId }) {
  const userAvatar = name.split('')[0];

  function handleClick() {
    getUserId(id);
  }

  return (
    <button className={`user-row d-flex align-items-center border-0 rounded-2 p-2 mb-1 ${index === 0 && 'user-row_active'}`} onClick={handleClick} type="button">
      <span className="user-avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 me-3">{userAvatar}</span>
      <span className="text-muted fs-6">{name}</span>
    </button>
  );
}

export default UserRow;
