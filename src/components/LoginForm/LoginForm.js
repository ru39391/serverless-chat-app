import React from 'react';
import {
  Col,
  Container,
  Card,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { EnvelopeAt, Person, ChatLeftDots } from 'react-bootstrap-icons';
import { validationParams, validationMessData } from '../../utils/constants';
import FormError from '../FormError/FormError';
import './LoginForm.scss';

function LoginForm({ handleForm, isError }) {
  const [BtnDisabled, setBtnDisabled] = React.useState(true);
  const [LoginFormData, setLoginFormData] = React.useState({});
  const [FormErrorsData, setFormErrorsData] = React.useState({});

  const inputValidators = {
    name: (value) => {
      if(value) {
        return validationParams.name.test(value);
      }
      return;
    },
    email: (value) => {
      if(value) {
        return validationParams.email.test(value);
      }
      return;
    },
  }

  function validateInputs(data) {
    const inputData = {};
    const dataArr = Object.keys(data);
    for(let i = 0; i < dataArr.length; i++) {
      inputData[dataArr[i]] = inputValidators[dataArr[i]](data[dataArr[i]]);
    }
    setFormErrorsData(inputData);
    return inputData;
  }

  function validateFormData(data) {
    const inputArr = Object.values(validateInputs(data));
    if(inputArr.length === Object.keys(inputValidators).length && inputArr.every(item => Boolean(item))) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData({
      ...LoginFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setBtnDisabled(true);
    handleForm(LoginFormData);
  }

  React.useEffect(() => {
    validateFormData(LoginFormData);
  }, [LoginFormData]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <Container className="d-flex justify-content-center">
        <Col xl={4}>
          <Card border="0" className="login-form p-4">
            <div className="d-flex flex-column align-items-center mb-2">
              <ChatLeftDots color="royalblue" size={48} className="mb-2" />
              <Card.Title className="text-dark mb-2">Войдите,</Card.Title>
              <Card.Subtitle className="text-dark-emphasis mb-4">чтобы начать общение</Card.Subtitle>
              {isError && <FormError errorText={validationMessData.loginError} />}
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="fs-6 text-black">Введите e-mail</Form.Label>
                <InputGroup className="mb-2 border-light">
                  <InputGroup.Text><EnvelopeAt /></InputGroup.Text>
                  <Form.Control
                    placeholder="E-mail"
                    aria-label="E-mail"
                    name="email"
                    type="email"
                    value={LoginFormData.email || ''}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                {LoginFormData.email && !FormErrorsData.email && <FormError errorText={validationMessData.email} />}                
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="fs-6 text-black">Введите имя</Form.Label>
                <InputGroup className="mb-2 border-light">
                  <InputGroup.Text><Person /></InputGroup.Text>
                  <Form.Control
                    placeholder="Ваше имя"
                    aria-label="Ваше имя"
                    name="name"
                    type="text"
                    value={LoginFormData.name || ''}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                {LoginFormData.name && !FormErrorsData.name && <FormError errorText={validationMessData.name} />}    
              </Form.Group>
              <Button className="btn btn_width_100pc" variant="primary" type="submit" disabled={BtnDisabled}>Войти</Button>
            </Form>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default LoginForm;
