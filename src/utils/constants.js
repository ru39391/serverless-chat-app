const validationParams = {
  name: /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/,
  email: /^([A-Za-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
  password: /^[A-Za-z0-9_-]{8,30}$/,
}

const validationMessData = {
  name: 'Имя должно состоять из букв и быть не короче 2 символов',
  email: 'Введите e-mail',
  loginError: 'Такой пользователь уже зарегистрирован!',
}

function getObjectKey(object) {
  return Object.keys(object)[0];
}

export {
  getObjectKey,
  validationParams,
  validationMessData
};