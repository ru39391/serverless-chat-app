import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import './UserRow.scss';

function UserRow({ name, userRow }) {
  function setUserPic() {
    return name.split('')[0];
  }

  return (
    <div className="user-row d-flex align-items-center p-2 mb-1">
      <span className="user-row__avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 me-3">{setUserPic()}</span>
      <span className="text-muted fs-6">{name}</span>
    </div>
  );
}

export default UserRow;
