'use strict';

const app = require('../app-data');
const ui = require('./ui');


//User CRUD
const signUp = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'sign-up',
    data,
  })
  .done(success, data)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'sign-in',
    data,
  })
  .done(success)
  .fail(failure);
};





const changePassword = (success, failure, data) => {
  $.ajax({
    method: "PATCH",
    url: app.api + 'change-password/' + ui.currentUser.id,
    data: {
      'passwords': {
        'old': data.pw_creds.old,
        'new': data.pw_creds.new
      }
    },
    headers: {
      contentType: "application.json",
      Authorization: "Token token=" + ui.currentUser.token
    },
  }).done(success)
  .fail(failure);
};


const signOut = (success, failure) => {
  $.ajax({
    method: "DELETE",
    url: app.api + 'sign-out/' + ui.currentUser.id,
    headers: {
      Authorization: 'Token token=' + ui.currentUser.token
    },
  }).done(success)
  .fail(failure);
};









module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
};
