import ChatRow from '../ChatRow/ChatRow';
import { getObjectKey } from '../../utils/constants';

function ChatConversation({ chatList, currentUser }) {
  return (
    <div className="chat__body flex-grow-1 p-4">
      {chatList.map((item, index) => (
        <ChatRow
          key={`${item.userKey}_${item.date}`}
          index={index}
          userKey={item.userKey}
          userName={item.userName}
          date={item.date}
          message={item.message}
          currentUser={getObjectKey(currentUser)}
          chatRow={item}
        />
      ))}
    </div>
  );
}

export default ChatConversation;