module.exports = {
  unauthorized: { unauthorized: 'User is not authorized' },
  success: { success: true }, // return when create, edit or delete an object
  notsuccess: { success: false }, // return when create, edit or delete an object
  noresult: { noresult: 'No result is found' },
  usernotfound: { usernotfound: 'User not found' },
  emailnotfound: { usernotfound: 'The email address does not existed' },
  emailexist: { emailexist: 'Email already exists' },
  activationfail: { activationfail: 'The token is invalid. Please Re-activate your email.' },
  isactive: { isactive: 'Account has activated' },
  notactive: { notactive: 'Account is not activated' },
  pwdincorrect: { password: 'Password incorrect' },
  employeesNotFound: { employeesNotFound: 'No employees found.' },
  employeeCreateError: { employeeCreateError: 'Was not able to save new employee.' },
};
