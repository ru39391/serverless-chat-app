import React from 'react';

function UserRow({ name }) {
  const userAvatar = name.split('')[0];

  return (
    <div className="user-row d-flex align-items-center border-0 rounded-2 p-2 mb-1">
      <span className="user-avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 me-3">{userAvatar}</span>
      <span className="text-muted fs-6">{name}</span>
    </div>
  );
}

export default UserRow;
