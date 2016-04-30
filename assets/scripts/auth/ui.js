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
    $('.landing-div').hide();
    $('.content').html('');
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
    $('.content').append(albumsDisplayTemplate({
      albums
    }));
    //when album panel is clicked to open edit modal
    $('.edit-album').on('click', function() {
      //load clicked album ID from data-attribute into local storage for use in auth/api.editAlbum call
      localStorage.setItem('ID', $(this).attr('data-attribute'));
      //sets value of 'edit album' fields so that they don't default to empty
      $('#editAlbumTitle').val($(this).find('.album-title').text());
      $('#editAlbumArtist').val($(this).find('.album-artist').text());
      $('#editAlbumThoughts').val($(this).find('.album-thoughts').text());
      $('#editAlbumModal').modal('show');
      //adds album info to wiki album fields
      $('#albumCoverTitle').val($(this).find('.album-title').text());
      $('#albumCoverArtist').val($(this).find('.album-artist').text());
      });
    //shows add album modal
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
  $('.open-signup').hide();
  $('.open-signin').text('Come on in');
};

const signInSuccess = (data) => {
  console.log('signed-in');
  console.log(data);
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  currentUser.username = data.user.username;
  $('.dropdown-toggle').text(currentUser.username);
  //show/hide user CRUD options
  $('#signInModal').modal('hide');
  $('landing-div').hide();
  $('#dropdown').show();
  //display user's albums on sign-in
  getAlbums();
  //change background
  $('body').addClass('signed-in-background');
  };

const changePasswordSuccess = () => {
  console.log('changed password');
  $('#changePasswordModal').modal('hide');
};

const signOutSuccess = () => {
  currentUser.token = '';
  currentUser.id = undefined;
  //show/hide user CRUD options and clear albums + username
  $('body').removeClass('signed-in-background');
  $('.content').html('');
  $('.landing-div').show();
  $('.dropdown-toggle').text('Sign In');
  console.log('signed out');
  $('#dropdown').hide();

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
  $('#albumCoverModal').modal('hide');
  console.log('looks like we made it');
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
