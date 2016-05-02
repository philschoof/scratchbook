'use strict';

// use require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled


const authApi = require('./auth/api');
const getFormFields = require('../../lib/get-form-fields');
const authUi = require('./auth/ui');


//Modal controls
$('.open-signup').on('click', function(event){
  event.preventDefault();
  $('#signUpModal').modal('show');
});

$('.open-signin').on('click', function(event){
  event.preventDefault();
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
  event.preventDefault();
  authApi.signUp(authUi.signUpSuccess, authUi.signUpFail, data);
});

$('#sign-in').on('submit', function (event){
  let data = getFormFields(this);
  event.preventDefault();
  authApi.signIn(authUi.signInSuccess, authUi.signInFail, data);
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
  event.preventDefault();
  authApi.newAlbum(authUi.newAlbumSuccess, authUi.failure, data);
});

$('#edit-album-form').on('submit', function(event){
  event.preventDefault();
  let data = getFormFields(this);
  authApi.editAlbum(authUi.editAlbumSuccess, authUi.failure, data);
});

$('#album-cover-form').on('submit', function(event){
  let data = getFormFields(this);
  console.log(data);
  console.log('index');
  event.preventDefault();
  authApi.getAlbumCover(authApi.albumCoverSuccess, authUi.failure, data);
});

$('#deleteAlbumConfirm').on('click', function(event){
  let data = getFormFields(this);
  event.preventDefault();
  authApi.deleteAlbum(authUi.deleteAlbumSuccess, authUi.failure, data);
});

$('.delete-cover').on('click', function(event) {
  event.preventDefault();
  authApi.deleteCover(authUi.deleteCoverSuccess, authUi.failure);
});

$(() =>{
  $('.navbar').fadeIn('slow');
  $('.landing').fadeIn('slow');
});
