const get = require('lodash/get');
const has = require('lodash/has');

const localizedErrorMessages = [
  'User already exists',
  'SMS limit',
  'User already confirmed',
  'Login is invalid',
  'Phone is unconfirmed',
  'Email is unconfirmed',
  'Password is invalid',
  'Email duplicate error',
  'Phone duplicate error',
  'Order not found',
  'Order already refunded',
  'Order is in the past',
  'Order already started',
  'Internal Server Error',
  'Order cannot be paid so soon',
  'Order duration should be no less than 3600',
  'Order by this period exists',
  'Schedule duration should be no less than room.duration_min',
  'Schedule by this period exists',
  'Confirmation error',
  'Since time is in the past',
  'Service must have valid .lat and .lot fields',
  'Service .periods.to must be greater then .periods.since',
  'Service .duration must be greater then 0',
  'Service by this period exists',
  'Service .quantity must be greater then 0',
];

const hasLocale = message => localizedErrorMessages.some(localizedErrorMessage => message.includes(localizedErrorMessage),
);
const getLocaleId = message => localizedErrorMessages
  .find(localizedErrorMessage => message.includes(localizedErrorMessage))
  .replace('.', ' ');

function handleError(error) {
  const errorMessages = {};

  if (has(error, ['response', 'data', 'error'])) {
    const errorMessage = get(error, ['response', 'data', 'error']);

    if (errorMessage === 'not found') {
      errorMessages.server = errorMessage;
    } else if (
      localizedErrorMessages.some(
        localizedErrorMessage => localizedErrorMessage === errorMessage,
      )
    ) {
      errorMessages.server = errorMessage;
    } else if (errorMessage.includes('Phone')) {
      errorMessages.phone = 'validation.mixed.required';
    } else if (errorMessage.includes('FirstName')) {
      errorMessages.first_name = 'validation.mixed.required';
    } else if (errorMessage.includes('Password')) {
      errorMessages.password = 'validation.mixed.required';
    } else if (errorMessage.includes('Role')) {
      errorMessages.role = 'validation.mixed.required';
    } else if (errorMessage.includes('Email')) {
      errorMessages.email = 'validation.mixed.required';
    } else {
      errorMessages.server = 'upsError';
    }
  } else if (error.message.includes('Internal Server Error')) {
    errorMessages.server = 'serverErrorMessage';
  } else if (hasLocale(error.message)) {
    errorMessages.server = getLocaleId(error.message);
  } else {
    errorMessages.server = 'upsError';
  }

  error.errorMessages = errorMessages;

  throw error;
}

module.exports = { handleError, getLocaleId, hasLocale };
