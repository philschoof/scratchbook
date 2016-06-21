'use strict';

const app = require('../app-data');
const albumApi = require('./album-api');
let moment = require('moment');
moment().format();



//selects random background class to add on login
let currentBackground = '';

let setBackground = function() {
  let backgroundClasses = ['signed-in-background-1', 'signed-in-background-2', 'signed-in-background-3','signed-in-background-1', 'signed-in-background-2' ];
  let backgroundIndex = Math.floor(Math.random() * 5);
  console.log("background index:", backgroundIndex);
  currentBackground = backgroundClasses[backgroundIndex];
  return currentBackground;
};

//User

const failure = (error) => {
  console.log("fail");
  console.log(error);
};


const signInSuccess = (data) => {
  console.log('signed-in');
  console.log(app);
  app.currentUser.token = data.user.token;
  app.currentUser.id = data.user.id;
  app.currentUser.username = data.user.username;
  $('.dropdown-toggle').text(app.currentUser.username);
  //show/hide user CRUD options
  $('.navbar').removeClass('hidden');
  $('#signInModal').modal('hide');
  $('.landing').hide();
  $('#dropdown').show();
  $('.sign-in-error').text('');
  //display user's albums on sign-in
  albumApi.getAlbums();
  //change background
  $('body').addClass(setBackground());
};

const signInFail = () => {
  console.log('sign up fail');
  $('.sign-in-error').show();
};

const signUpSuccess = () => {
  console.log('signed-up');
  $('#signUpModal').modal('hide');
  $('.sign-up-error').text('');
  $('.open-signup').hide();
  $('.open-signin').text('Come on in');
};

const signUpFail = () => {
  console.log('sign up fail');
  $('.sign-up-error').show();
};

const changePasswordSuccess = () => {
  console.log('changed password');
  $('#changePasswordModal').modal('hide');
};

const signOutSuccess = () => {
  app.currentUser.token = '';
  app.currentUser.id = 0;
  //show/hide user CRUD options and clear albums + username
  $('body').removeClass(currentBackground);
  $('.content').html('');
  $('.landing').show();
  $('.open-signup').show();
  $('.open-signin').text('Been here before?');
  console.log('signed out');
  $('#dropdown').hide();

};



module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  signOutSuccess,
  failure
};
