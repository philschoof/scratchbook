'use strict';

const userApi = require('./user-api');
const userUi = require('./user-ui');
const getFormFields = require('../../../lib/get-form-fields');

const userEventHandlers = () => {
  $('#sign-up').on('submit', function (event){
    let data = getFormFields(this);
    // console.log(data);
    event.preventDefault();
    userApi.signUp(userUi.signUpSuccess, userUi.signUpFail, data);
  });

  $('#sign-in').on('submit', function (event){
    let data = getFormFields(this);
    event.preventDefault();
    userApi.signIn(userUi.signInSuccess, userUi.signInFail, data);
  });

  $('#change-password').on('submit', function(event){
    let data = getFormFields(this);
    event.preventDefault();
    userApi.changePassword(userUi.changePasswordSuccess, userUi.failure, data);
  });

  $('.sign-out').on('click', function(event){
    event.preventDefault();
    userApi.signOut(userUi.signOutSuccess, userUi.failure);
  });

};

module.exports = {
  userEventHandlers
};
