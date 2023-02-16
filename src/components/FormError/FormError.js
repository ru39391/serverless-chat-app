import Form from 'react-bootstrap/Form';

function FormError({ errorText }) {
  return (
    <Form.Text className="text-danger">{errorText}</Form.Text>
  );
}
FormError.defaultProps = {
  errorText: 'Что-то пошло не так...'
};

export default FormError;
