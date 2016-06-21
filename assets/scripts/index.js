'use strict';

// use require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled


const userApi = require('./auth/user-api');
const albumApi = require('./auth/album-api');
const userUi = require('./auth/user-ui');
const albumUi = require('./auth/album-ui');
const getFormFields = require('../../lib/get-form-fields');


//Modal controls
$('.open-signup').on('click', function(event){
  event.preventDefault();
  $('.sign-up-error').hide();
  $('#signUpModal').modal('show');
});

$('.open-signin').on('click', function(event){
  event.preventDefault();
  $('.sign-in-error').hide();
  $('#signInModal').modal('show');
});

$('.open-change-password').on('click', function(event){
  event.preventDefault();
  $('#changePasswordModal').modal('show');
});

$('.delete-album-modal-button').on('click', function(event) {
  event.preventDefault();
  $('#deleteAlbumModal').modal('show');
});

$('.album-cover-modal').on('click', function(event) {
  event.preventDefault();
  //to clear residual error messages
  $('.album-cover-error').text('');
  $('#albumCoverModal').modal('show');
});

//open-new-album modal and edit-modal are in auth/ui.displayAlbums





//Users
$('#sign-up').on('submit', function (event){
  let data = getFormFields(this);
  console.log(data);
  localStorage.setItem('email', data.credentials.email);
  localStorage.setItem('password', data.credentials.password);
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




//Albums
$('#new-album').on('submit', function(event){
  let data = getFormFields(this);
  event.preventDefault();
  albumApi.newAlbum(albumUi.newAlbumSuccess, albumUi.newAlbumFail, data);
});

$('#edit-album-form').on('submit', function(event){
  event.preventDefault();
  let data = getFormFields(this);
  albumApi.editAlbum(albumApi.editAlbumSuccess, albumApi.editAlbumFailure, data);
});

$('#album-cover-form').on('submit', function(event){
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  albumApi.getAlbumCover(albumApi.albumCoverSuccess, albumUi.failure, data);
});

$('#deleteAlbumConfirm').on('click', function(event){
  let data = getFormFields(this);
  event.preventDefault();
  albumApi.deleteAlbum(albumUi.deleteAlbumSuccess, albumUi.failure, data);
});

$('.delete-cover').on('click', function(event) {
  console.log("delete cover clicked");
  event.preventDefault();
  albumApi.deleteCover(albumApi.deleteCoverSuccess, albumUi.failure);
});

// $(() =>{
//   $('.navbar').fadeIn('slow');
//   $('.landing').fadeIn('slow');
// });
