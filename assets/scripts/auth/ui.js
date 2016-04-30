'use strict';

const authApi = require('./api');
const app = require('../app-data');

//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined,
  username: undefined
};




//displayAlbums function used in getAlbums api call. Passes albums object to handlebars
let displayAlbums = function(albums){
    $('.content').html('');
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
    $('.content').append(albumsDisplayTemplate({
      albums
    }));
    $('.edit-album').on('click', function() {
      //load clicked album ID from data-attribute into local storage for use in auth/api.editAlbum call
      localStorage.setItem('ID', $(this).attr('data-attribute'));
      //sets value of 'edit album' fields so that they don't default to empty
      $('#editAlbumTitle').attr('value', $(this).find('.album-title').text());
      $('#editAlbumArtist').attr('value', $(this).find('.album-artist').text());
      $('#editAlbumThoughts').attr('value', $(this).find('.album-thoughts').text());
      $('#editAlbumModal').modal('show');
      });
    $('.open-new-album').on('click', function(event){
      event.preventDefault();
      $('#newAlbumModal').modal('show');
  });
};


//Read albums
let getAlbums = function(){
  $.ajax({
    method: "GET",
    url: app.api + 'users/' + currentUser.id + '/albums',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + currentUser.token
    }
  }).done(function(albums){
    console.log(albums);
    displayAlbums(albums);

  });
};


//API outcomes


//User
const signUpSuccess = (data) => {
  console.log('signed-up');
  console.log(data);
  $('#signUpModal').modal('hide');
};

const signInSuccess = (data) => {
  console.log('signed-in');
  console.log(data);
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  currentUser.username = data.user.username;
  $('.navbar-brand').text(currentUser.username);
  //show/hide user CRUD options
  $('#signInModal').modal('hide');
  $('.open-signup').hide();
  $('.open-signin').hide();
  $('.open-change-password').show();
  $('.sign-out').show();
  //display user's albums on sign-in
  getAlbums();
  };

const changePasswordSuccess = () => {
  console.log('changed password');
  $('#changePasswordModal').modal('hide');
};

const signOutSuccess = () => {
  currentUser.token = '';
  currentUser.id = undefined;
  $('.content').html('');
  console.log('signed out');
  $('.open-signup').show();
  $('.open-signin').show();
  $('.open-change-password').hide();
  $('.sign-out').hide();
};





//Album
const newAlbumSuccess = (data) => {
  console.log(data);
  $('#newAlbumModal').modal('hide');
  getAlbums();
};

const editAlbumSuccess = () => {
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  $('#editAlbumModal').modal('hide');
  getAlbums();
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
  getAlbums();
};


const failure = (error) => {
  console.log("fail");
  console.log(error);
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  newAlbumSuccess,
  editAlbumSuccess,
  deleteAlbumSuccess,
  failure,
  currentUser
};
