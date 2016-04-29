'use strict';

// use require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled


require('./example');
const authApi = require('./auth/api');
require('./auth/events');
const authUi = require('./auth/ui');

//Users
$('#sign-up').on('submit', function (event){
  console.log('click');
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
});

$('#sign-in').on('submit', function (event){
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  authApi.signIn(authUi.signInSuccess, authUi.failure, data);

});

$('#change-password').on('submit', function(event){
  let data = getFormFields(this);
  event.preventDefault();
  authApi.changePassword(authUi.changePasswordSuccess, authUi.failure, data);
});

$('.sign-out').on('click', function(event){
  event.preventDefault();
  authApi.signOut(authUi.signOutSuccess, authUi.failure);
});




//Albums
$('#new-album').on('submit', function(event){
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  authApi.newAlbum(authUi.newAlbumSuccess, authUi.failure, data);
});

//To open the edit modal
$('.albums').on('click', function(event){
  event.preventDefault();
  authApi.getAlbums();
});

$('#edit-album-form').on('submit', function(event){
  event.preventDefault();
  // let editAlbumId = $(this).attr('data-attribute').data();
  let data = getFormFields(this);
  // console.log(data, editAlbumId);
  authApi.editAlbum(authUi.editAlbumSuccess, authUi.failure, data);
});

module.exports = {
  authApi,
};
