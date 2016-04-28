'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const authApi = require('./api');
const authUi = require('./ui');


const addHandlers = () => {

//sign-up
  // $('#sign-up').on('submit', function (event){
  //   console.log('click');
  //   let data = getFormFields(this);
  //   console.log(data);
  //   event.preventDefault();
  //   authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
  // });

//sign-in
  // $('#sign-in').on('submit', function (event){
  //   let data = getFormFields(this);
  //   console.log(data);
  //   event.preventDefault();
  //   authApi.signIn(authUi.signInSuccess, authUi.failure, data);
  //
  // });

};
module.exports = {
  addHandlers,
};
