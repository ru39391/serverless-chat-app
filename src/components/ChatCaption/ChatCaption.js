import React from 'react';

function ChatCaption({ chatData }) {
  const [CaptionData, setCaptionData] = React.useState({});
  const { caption, avatar } = CaptionData;

  function setCaption(data) {
    const isDataExist = Boolean(Object.values(data).length);
    setCaptionData({
      caption: isDataExist ? data.userName : 'Ожидаем подключения других пользователей',
      avatar: isDataExist ? data.userName.split('')[0] : '',
    });
  }

  React.useEffect(() => {
    setCaption(chatData);
  }, [chatData]);

  return (
    <h4 className={`text-muted mb-0 ${avatar && 'd-flex align-items-center'}`}>
      {avatar && <span className="user-avatar user-avatar_type_inverted d-flex flex-column justify-content-center align-items-center fs-5 fw-semibold rounded-circle p-2 me-3">{avatar}</span>}
      {caption}
    </h4>
  );
}

export default ChatCaption;
