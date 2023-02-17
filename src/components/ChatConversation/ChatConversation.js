import React from 'react';
import ChatRow from '../ChatRow/ChatRow';
import { getObjectKey } from '../../utils/constants';

function ChatConversation({ chatList, currentUser }) {
  return (
    <div className="chat__body flex-grow-1 position-relative overflow-hidden py-4">
      <div className="chat__conversation position-absolute px-4">
        {chatList.map((item, index) => (
          <ChatRow
            key={`${item.userKey}_${item.date}`}
            index={index}
            userKey={item.userKey}
            userName={item.userName}
            date={item.date}
            message={item.message}
            currentUser={getObjectKey(currentUser)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatConversation;
