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
  const [ChatList, setChatList] = React.useState([]);
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

  function getUserId(id) {
    //console.log(`id: ${id}`);
  }

  function handleChatList(data = {}) {
    const chatList = localStorage.getItem('chatList');
    if(chatList) {
      const chatListArr = JSON.parse(chatList);
      chatListArr.push(data);
      setChatList(chatListArr);
      localStorage.setItem('chatList', JSON.stringify(chatListArr));
    } else {
      const chatListArr = [];
      chatListArr.push(data);
      setChatList(chatListArr);
      localStorage.setItem('chatList', JSON.stringify(chatListArr));
    }
  }

  function sendMessage(data) {
    const { message } = data;
    const messageData = {
      user: getObjectKey(currentUser),
      message,
      date: Date.now()
    };
    handleChatList(messageData);
    console.log(messageData);
  }

  React.useEffect(() => {
    handleUserList();
    document.title = Object.values(currentUser)[0];
    window.addEventListener('storage', () => {
      handleUserList();
    });
  }, []);
  console.log(ChatList);

  return (
    <Row className="flex-grow-1 mx-0">
      <Col xl={3} lg={4} className="pe-0">
        <div className="panel h-100">
          <div className="panel__header p-4">
            <h4 className="fw-semibold text-dark mb-0">Контакты</h4>
          </div>
          <div className="d-flex flex-column p-4">
            {UserList.map((userData, index) => (
              <UserRow
                key={getObjectKey(userData)}
                index={index}
                id={getObjectKey(userData)}
                name={Object.values(userData)[0]}
                currentUser={getObjectKey(currentUser)}
                userRow={userData}
                getUserId={getUserId}
              />
            ))}
          </div>
        </div>
      </Col>
      <Col xl={9} lg={8} className="bg-white px-0">
        <div className="chat d-flex flex-column h-100">
          <div className="chat__header border-bottom px-4 py-3">
            <ChatCaption userList={UserList} />
          </div>
          <div className="chat__body flex-grow-1 p-4"></div>
          <div className="chat__footer border-top p-4">
            <ChatMessenger userList={UserList} handleForm={sendMessage} />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
