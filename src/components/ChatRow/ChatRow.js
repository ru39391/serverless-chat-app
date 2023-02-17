import {
  Col,
} from 'react-bootstrap';

function ChatRow({ userKey, userName, date, message, currentUser }) {
  const userAvatar = Boolean(userName) ? userName.split('')[0] : '';

  return (
    <div className={`d-flex justify-content-${userKey === currentUser ? 'end' : 'start'} mb-4`}>
      <Col md={6} xl={4} className='chat__message d-flex px-0'>
        <div className={`d-flex flex-column justify-content-end order-${userKey === currentUser ? 2 : 1}`}>
          <span className={`user-avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 ${userKey !== currentUser ? 'user-avatar_inverted me-3' : 'ms-3'}`}>{userAvatar}</span>
        </div>
        <div className={`d-flex flex-column flex-grow-1 order-${userKey === currentUser ? 1 : 2}`}>
          <div className={`chat__message-bubble p-3 mb-2 ${userKey === currentUser && 'chat__message-bubble_inverted text-dark'}`}>
            <div className="mb-2">{message}</div>
            <span>{date}</span>
          </div>
          {userName}
        </div>
      </Col>
    </div>
  );
}

export default ChatRow;
