import { Col } from 'react-bootstrap';
import { Clock } from 'react-bootstrap-icons';

function ChatRow({ userKey, userName, date, message, currentUser }) {
  const userAvatar = Boolean(userName) ? userName.split('')[0] : '';

  function formatDateValue(value) {
    return value < 10 ? `0${value}` : value;
  }

  function formatDate() {
    const messDate = new Date(date);
    return `${formatDateValue(messDate.getDate())}.${formatDateValue(messDate.getMonth() + 1)}.${messDate.getFullYear()} ${formatDateValue(messDate.getHours())}:${formatDateValue(messDate.getMinutes())}:${formatDateValue(messDate.getSeconds())}`;
  }

  return (
    <Col md={8} className={`chat__message fs-6 d-flex ${userKey === currentUser && 'justify-content-end offset-md-4'} px-0 mb-4`}>
      <div className={`d-flex flex-column justify-content-end order-${userKey === currentUser ? 2 : 1}`}>
        <span className={`user-avatar d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 ${userKey !== currentUser ? 'user-avatar_inverted me-3' : 'ms-3'}`}>{userAvatar}</span>
      </div>
      <div className={`d-flex flex-column order-${userKey === currentUser ? 1 : 2}`}>
        <div className={`chat__message-bubble px-4 py-3 mb-4 ${userKey === currentUser && 'chat__message-bubble_inverted text-dark'}`}>
          <div className="chat__message-text mb-3">{message}</div>
          <span className={`chat__message-date d-flex align-items-center ${userKey === currentUser ? 'text-muted' : 'justify-content-end text-light'}`}>
            <Clock className={`me-1 ${userKey === currentUser && 'text-dark'}`} />
            {formatDate()}
          </span>
        </div>
        <span className={`chat__message-username ${userKey === currentUser && 'text-end'}`}>{userName}</span>
      </div>
    </Col>
  );
}

export default ChatRow;
