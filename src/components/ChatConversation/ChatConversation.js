import React from 'react';
import { Alert } from 'react-bootstrap';
import ChatRow from '../ChatRow/ChatRow';
import { getObjectKey } from '../../utils/constants';

function ChatConversation({ chatList, currentUser }) {
  return (
    <div className="chat__body flex-grow-1 position-relative overflow-hidden">      
      <div className="chat__conversation position-absolute p-4">
        {!chatList.length && <Alert variant="secondary" className="text-center text-muted">В этом чате ещё нет сообщений</Alert>}        
        {chatList.map((item, index) => (
          <ChatRow
            key={`${item.userKey}_${item.date}`}
            index={index}
            userKey={item.userKey}
            userName={item.userName}
            date={item.date}
            message={item.message}
            currentUser={getObjectKey(currentUser)}
            chatList={chatList}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatConversation;
