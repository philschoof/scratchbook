'use strict';

const authApi = require('./api');
const app = require('../app-data');

//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined
};




//displayAlbums function used in getAlbums api call. Passes albums object to handlebars
let displayAlbums = function(albums){
    $('.content').html('');
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
    $('.content').append(albumsDisplayTemplate({
      albums
    }));
    $('.edit-album').on('click', function() {
    localStorage.setItem('ID', $(this).attr('data-attribute'));
    $('#editAlbumModal').modal('show');
  });
};

//Read albums
let getAlbums = function(){
  console.log('inside');
  $.ajax({
    method: "GET",
    url: app.api + 'users/' + currentUser.id + '/albums',
    // method: 'GET',
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
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  $('#signInModal').modal('hide');
  $('.open-signup').hide();
  $('.open-signin').hide();
  $('.open-change-password').show();
  $('.sign-out').show();
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
};

const editAlbumSuccess = (data) => {
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  console.log(data);
  $('#signInModal').modal('hide');
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
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
