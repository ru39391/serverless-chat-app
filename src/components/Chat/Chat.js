import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import UserRow from '../UserRow/UserRow';
import ChatCaption from '../ChatCaption/ChatCaption';
import ChatMessenger from '../ChatMessenger/ChatMessenger';
import { getObjectKey } from '../../utils/constants';

function Chat({ currentUser }) {
  const [UserList, setUserList] = React.useState([]);
  const [CurrentChat, setCurrentChat] = React.useState([]);
  const [ChatMeta, setChatMeta] = React.useState({});

  function sortUserList(arr) {
    const sortedArr = arr.map((item, index) => {
      return {
        index: index,
        value: item[getObjectKey(item)],
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
    const sortedUserList = sortUserList(userList);
    setUserList(sortedUserList);
  }

  function renderUserList() {
    return UserList.map((userData, index) => (
      <UserRow
        key={getObjectKey(userData)}
        index={index}
        id={getObjectKey(userData)}
        name={Object.values(userData)[0]}
        currentUser={getObjectKey(currentUser)}
        userRow={userData}
        getUserId={getUserId}
      />
    ));
  }

  function getUserId(id) {
    //console.log(`id: ${id}`);
  }

  function setChatKeys(data = ChatMeta) {
    const { key } = data;
    const defaultUserKey = getObjectKey(currentUser).replace('user_', '');
    return {
      defaultChatKey: `chat_${defaultUserKey}_${key}`,
      chatKey: `chat_${key}_${defaultUserKey}`,
    };
  }

  function setChatList(data = {}) {
    console.log(data);
    const { defaultChatKey, chatKey } = setChatKeys();
    const chatList = localStorage.getItem(defaultChatKey) || localStorage.getItem(chatKey);
    if (chatList) {
      console.log(1);
      const chatListArr = JSON.parse(chatList);
      chatListArr.push(data);
      localStorage.setItem(defaultChatKey, JSON.stringify(chatListArr));
      setCurrentChat(chatListArr);
    } else {
      console.log(0);
      const chatListArr = [];
      chatListArr.push(data);
      localStorage.setItem(defaultChatKey, JSON.stringify(chatListArr));
      setCurrentChat(chatListArr);
    }

    /*
    if (chatList) {
      const chatData = JSON.parse(chatList); // {}
      const currentChatKey = Object.keys(chatData).find((item) => item === defaultChatKey || item === chatKey);
      chatData[currentChatKey].push(data);
      localStorage.setItem('chatList', JSON.stringify(chatData));
      setCurrentChat(chatData[currentChatKey]);
    } else {
      const chatData = {};
      chatData[defaultChatKey] = [];
      localStorage.setItem('chatList', JSON.stringify(chatData));
      setCurrentChat(chatData[defaultChatKey]);
    }
    */
  }

  function handleChatList() {
    setChatList();
    //console.log(setChatKeys());
  }

  function sendMessage(data) {
    const { message } = data;
    const messageData = {
      user: getObjectKey(currentUser),
      message,
      date: Date.now()
    };
    setChatList(messageData);
  }

  React.useEffect(() => {
    handleUserList();
    document.title = Object.values(currentUser)[0];
    window.addEventListener('storage', () => {
      handleUserList();
    });
  }, []);

  React.useEffect(() => {
    setChatMeta(
      UserList.length > 0
        ? {
            key: getObjectKey(UserList[0]).replace('user_', ''),
            userName: Object.values(UserList[0])[0],
          }
        : {}
    );
  }, [UserList]);

  
  React.useEffect(() => {
    if (Object.values(ChatMeta).length) {
      handleChatList();
    }
    //console.log(ChatMeta);
  }, []);
  
  console.log(CurrentChat);

  return (
    <Row className="flex-grow-1 mx-0">
      <Col xl={3} lg={4} className="pe-0">
        <div className="panel h-100">
          <div className="panel__header p-4">
            <h4 className="fw-semibold text-dark mb-0">Контакты</h4>
          </div>
          <div className="d-flex flex-column p-4">{renderUserList()}</div>
        </div>
      </Col>
      <Col xl={9} lg={8} className="bg-white px-0">
        <div className="chat d-flex flex-column h-100">
          <div className="chat__header border-bottom px-4 py-3">
            <ChatCaption chatMeta={ChatMeta} />
          </div>
          <div className="chat__body flex-grow-1 p-4"></div>
          <div className="chat__footer border-top p-4">
            <ChatMessenger chatMeta={ChatMeta} handleForm={sendMessage} />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
