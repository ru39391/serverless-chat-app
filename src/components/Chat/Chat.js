import React from 'react';
import { Col } from 'react-bootstrap';
import Panel from '../Panel/Panel';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatConversation from '../ChatConversation/ChatConversation';
import ChatMessenger from '../ChatMessenger/ChatMessenger';
import { getObjectKey } from '../../utils/constants';

function Chat({ currentUser }) {
  const [UserList, setUserList] = React.useState([]);
  const [ChatList, setChatList] = React.useState([]);

  function sortArr(arr, key = '') {
    const sortedArr = arr.map((item, index) => {
      return {
        index: index,
        value: Boolean(key) ? item[key] : item[getObjectKey(item)],
      };
    });

    sortedArr.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });

    return sortedArr.map((item) => arr[item.index]);
  }

  function handleUserList() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    const currentUserIndex = userList
      .map((item) => getObjectKey(item))
      .indexOf(getObjectKey(currentUser));
    userList.splice(currentUserIndex, 1);

    const sortedUserList = sortArr(userList);
    setUserList(sortedUserList);
  }

  function handleChatList(data = {}) {
    const chatList = localStorage.getItem('chatList');
    const chatListArr = Boolean(chatList) ? JSON.parse(chatList) : [];
    chatListArr.push(data);

    const sortedChatList = sortArr(chatListArr.filter((item) => {
      const arr = Object.values(item);
      return Boolean(arr[arr.length - 1]);
    }), 'date');
    localStorage.setItem('chatList', JSON.stringify(sortedChatList));
    setChatList(sortedChatList);
  }

  function sendMessage(data) {
    const { message } = data;
    const messageData = {
      userKey: getObjectKey(currentUser),
      userName: Object.values(currentUser)[0],
      date: Date.now(),
      message,
    };
    handleChatList(messageData);
  }

  React.useEffect(() => {
    document.title = Object.values(currentUser)[0];

    handleUserList();
    handleChatList();

    window.addEventListener('storage', () => {
      handleUserList();
      handleChatList();
    });
  }, []);

  return (
    <div className="d-flex flex-lg-row flex-lg-wrap flex-column flex-grow-1">
      <Col xl={3} lg={4} className="px-0">
        <Panel userList={UserList} currentUser={currentUser} />
      </Col>
      <Col xl={9} lg={8} className="bg-white d-flex flex-column flex-grow-1 px-0">
        <div className="chat d-flex flex-column flex-grow-1">
          <ChatHeader userList={UserList} />
          <ChatConversation chatList={ChatList} currentUser={currentUser} />
          <ChatMessenger userList={UserList} handleForm={sendMessage} />
        </div>
      </Col>
    </div>
  );
}

export default Chat;
