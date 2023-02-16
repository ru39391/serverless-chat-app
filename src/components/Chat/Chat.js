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

function Chat({ currentUser }) {
  const [UserList, setUserList] = React.useState([]);

  function getUserList() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    setUserList(userList);
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

  function renderUserList() {
    const sortedUserList = sortUserList(UserList);
    return sortedUserList.map((userData, index) => (<UserRow key={Object.keys(userData)[0]} name={Object.values(userData)[0]} userRow={userData} />));
  }

  React.useEffect(() => {
    getUserList();
    document.title = Object.values(currentUser)[0];    
    window.addEventListener('storage', () => {
      getUserList();
    });
  }, []);

  return (
    <Row className="flex-grow-1 mx-0">
      <Col xl={3} lg={4} className="pe-0">
        <div className="panel h-100 p-4">
          <div className="panel__header">
            <h3 className="fw-bold text-dark mb-4">Контакты</h3>
          </div>
          <div className="panel__body">{renderUserList()}</div>
        </div>
      </Col>
      <Col xl={9} lg={8} className="bg-white">
        <div className="chat"></div>
      </Col>
    </Row>
  );
}

export default Chat;
