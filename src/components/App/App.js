import React from 'react';
import Chat from '../Chat/Chat';
import LoginForm from '../LoginForm/LoginForm';
import './App.scss';

function App() {
  const [IsLoggedIn, setLoggedIn] = React.useState(false);
  const [IsLoginError, setLoginError] = React.useState(false);
  const [CurrentUser, setCurrentUser] = React.useState({});

  function getCurrentUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    if(currentUser) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(currentUser));
    }
  }

  function isUserExist(arr, username) {
    const userNamesArr = arr.map(item => Object.keys(item)[0]);
    return !(userNamesArr.indexOf(username) < 0);
  }

  function handleUserList(data, arr = []) {
    const userName = Object.keys(data)[0];
    if(isUserExist(arr, userName)) {
      setLoginError(true);
    } else {
      setLoginError(false);
      arr.push(data);
      setLoggedIn(true);
      localStorage.setItem('userList', JSON.stringify(arr));
    };
  }

  function signIn(data) {
    const { email, name } = data;
    const currentUserData = {};
    const userName = `user_${email.split('@').join('_').split('.').join('_')}`;
    const userList = localStorage.getItem('userList');

    currentUserData[userName] = name;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUserData));
    setCurrentUser(currentUserData);

    if(userList) {
      handleUserList(currentUserData, JSON.parse(userList));
    } else {
      handleUserList(currentUserData);
    }
  }

  React.useEffect(() => {
    getCurrentUser();
  }, []);
  //localStorage.clear();
  //sessionStorage.clear();
  //console.log(UserList);
  //console.log(CurrentUser);

  return (
    <>{IsLoggedIn ? <Chat currentUser={CurrentUser} /> : <LoginForm handleForm={signIn} isError={IsLoginError} />}</>
  );
}

export default App;
