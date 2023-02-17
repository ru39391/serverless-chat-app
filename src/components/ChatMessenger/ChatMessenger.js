import React from "react";
import {
  Form,
  Button,
} from "react-bootstrap";
import { Send } from 'react-bootstrap-icons';

function ChatMessenger({ userList, handleForm }) {
  const [IsMessengerDisabled, setMessengerDisabled] = React.useState(true);
  const [MessageFormData, setMessageFormData] = React.useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setMessageFormData({
      ...MessageFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm(MessageFormData);
    setMessageFormData({});
  }

  React.useEffect(() => {
    setMessengerDisabled(!Boolean(userList.length));
  }, [userList]);

  return (
    <Form className="d-flex align-items-start" onSubmit={handleSubmit}>
      <Form.Control
        as="textarea"
        name="message"
        placeholder="Введите сообщение"
        className="chat__textarea me-3"
        value={MessageFormData.message || ''}
        onChange={handleChange}
        disabled={IsMessengerDisabled}
      />
      <Button className="btn btn_width_100pc px-3 py-2" variant="primary" type="submit" disabled={IsMessengerDisabled}>
        <Send size={32} />
      </Button>
    </Form>
  );
}

export default ChatMessenger;
