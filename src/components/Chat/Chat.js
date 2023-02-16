import React from 'react';
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import UserRow from '../UserRow/UserRow';
import { getObjectKey } from '../../utils/constants';

function Chat({ currentUser }) {
  const [UserList, setUserList] = React.useState([]);

  function getUserList() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    const currentUserIndex = userList.map(item => getObjectKey(item)).indexOf(getObjectKey(currentUser));
    userList.splice(currentUserIndex, 1);
    const sortedUserList = sortUserList(userList);
    setUserList(sortedUserList);
  }

  function sortUserList(arr) {
    const sortedArr = arr.map((item, index) => {
      return {
        'index': index,
        'value': item[Object.keys(item)[0]]
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

  function getUserId(id) {
    console.log(`id: ${id}`);
  }

  function setChatData() {
    console.log(UserList);
  }

  function renderUserList() {
    return UserList.map((userData, index) => (
      <UserRow
        key={Object.keys(userData)[0]}
        index={index}
        id={Object.keys(userData)[0]}
        name={Object.values(userData)[0]}
        currentUser={Object.keys(currentUser)[0]}
        userRow={userData}
        getUserId={getUserId}
        />
      ));
  }

  React.useEffect(() => {
    getUserList();
    document.title = Object.values(currentUser)[0];    
    window.addEventListener('storage', () => {
      getUserList();
    });
  }, []);
  console.log(UserList);

  return (
    <Row className="flex-grow-1 mx-0">
      <Col xl={3} lg={4} className="pe-0">
        <div className="panel h-100 p-4">
          <div className="panel__header">
            <h3 className="fw-bold text-dark mb-4">Контакты</h3>
          </div>
          <div className="d-flex flex-column">{renderUserList()}</div>
        </div>
      </Col>
      <Col xl={9} lg={8} className="bg-white px-0">
        <div className="chat">
          <div className="chat__header p-4 border-bottom"></div>
          <div className="chat__body p-4"></div>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
