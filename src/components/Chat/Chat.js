import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import UserRow from '../UserRow/UserRow';
import ChatCaption from '../ChatCaption/ChatCaption';
import { getObjectKey } from '../../utils/constants';

function Chat({ currentUser }) {
  const [UserList, setUserList] = React.useState([]);
  const [CurrentChat, setCurrentChat] = React.useState([]);
  //const [DefaultChatKey, setDefaultChatKey] = React.useState('');
  const [ChatData, setChatData] = React.useState({});

  function sortUserList(arr) {
    const sortedArr = arr.map((item, index) => {
      return {
        'index': index,
        'value': item[getObjectKey(item)]
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
  
    return sortedArr.map(item => arr[item.index]);
  }

  function handleUserList() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    const currentUserIndex = userList.map(item => getObjectKey(item)).indexOf(getObjectKey(currentUser));
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

  function isChatExist(arr, data) {
    return (arr.length > 1) ? true : false;
  }

  function handleChatList() {
    const { key } = ChatData;
    const defaultUserKey = getObjectKey(currentUser).replace('user_','');
    const chatKeys = {
      defaultChatKey: `chat_${defaultUserKey}_${key}`,
      chatKey: `chat_${key}_${defaultUserKey}`,
    };

    const { defaultChatKey, chatKey} = chatKeys;
    const chatList = localStorage.getItem('chatList');
    if(chatList) {
      const chatListArr = JSON.parse(chatList);
      const currentChatKey = Object.keys(chatListArr).find(item => item === defaultChatKey || item === chatKey);
      setCurrentChat(chatListArr[currentChatKey]);
    } else {
      const chatListArr = {};
      chatListArr[defaultChatKey] = [];
      localStorage.setItem('chatList', JSON.stringify(chatListArr));
    }
  }

  React.useEffect(() => {
    handleUserList();
    document.title = Object.values(currentUser)[0];    
    window.addEventListener('storage', () => {
      handleUserList();
    });
  }, []);

  React.useEffect(() => {
    //setDefaultChatKey(UserList.length > 0 ? getObjectKey(UserList[0]).replace('user_','') : '');
    setChatData(UserList.length > 0 ? {
      key: getObjectKey(UserList[0]).replace('user_',''),
      userName: Object.values(UserList[0])[0]
    } : {});
  }, [UserList]);

  React.useEffect(() => {
    if(Object.values(ChatData).length) {
      handleChatList();
    }
  }, [ChatData]);

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
        <div className="chat">
          <div className="chat__header px-4 py-3 border-bottom"><ChatCaption chatData={ChatData} /></div>
          <div className="chat__body p-4"></div>
          <div className="chat__footer p-4"></div>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
