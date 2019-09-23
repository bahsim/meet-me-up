export const registrationMainForm = {
  name: 'registration-main-form',
  fields: ['username', 'email'],
};

export const registrationProfileForm = {
  name: 'registration-profile-form',
  fields: [
    'nickname',
    'gender',
    'age',
    'city',
    'aboutMe',
  ],
};

export const authorizationForm = {
  name: 'authorization-form',
  fields: ['username', 'password'],
};

export const changeEmailForm = {
  name: 'change-email-form',
  fields: ['email', 'password'],
};

export const changePasswordForm = {
  name: 'change-password-form',
  fields: ['old', 'new'],
};

export const recoveryPasswordForm = {
  name: 'recovery-password-form',
  fields: ['login'],
};

export const advertisementNewForm = {
  name: 'advertisement-new-form',
  fields: ['content'],
};

export const premiumByCardForm = {
  name: 'premium-by-card-form',
  fields: [
    'firstName',
    'lastName',
    'cardNumber',
    'cardDate',
    'cardCode',
    'adress',
    'adressInnerNuber',
    'city',
    'region',
    'zipCode',
    'country',
  ],
};

export const premiumByPhoneForm = {
  name: 'premium-by-phone-form',
  fields: [
    'operator',
    'phone',
    'country',
  ],
};

export const searchParamsForm = {
  name: 'search-params-form',
  fields: [
    'myChoice',
    'oppositeChoice',
    'position',
    'city',
    'online',
    'withPhoto',
    'premium',
  ],
};
