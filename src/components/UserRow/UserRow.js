import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

function UserRow({ id, name, index, currentUser, getUserId }) {
  function setUserPic() {
    return name.split('')[0];
  }

  function isCurrentUser() {
    return id === currentUser;
  }

  function handleClick() {
    getUserId(id);
  }

  //console.log(currentUser);

  return (
    <button className={`user-row d-flex align-items-center border-0 rounded-2 p-2 mb-1 ${isCurrentUser() && 'user-row_current'} ${index === 0 && 'user-row_active'}`} onClick={handleClick} type="button">
      <span className="user-row__avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 me-3">{setUserPic()}</span>
      <span className="text-muted fs-6">{name} {isCurrentUser() && '- это Вы'}</span>
    </button>
  );
}

export default UserRow;
