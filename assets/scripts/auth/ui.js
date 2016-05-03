'use strict';

const app = require('../app-data');

//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined,
  username: undefined
};

//selects random background class to add on login
let currentBackground = '';

let setBackground = function() {
  let backgroundClasses = ['signed-in-background-1', 'signed-in-background-2', 'signed-in-background-3','signed-in-background-1', 'signed-in-background-2' ];
  let backgroundIndex = Math.floor(Math.random() * 5);
  console.log(backgroundIndex);
  currentBackground = backgroundClasses[backgroundIndex];
  return currentBackground;
};




//displayAlbums function used in getAlbums api call. Passes albums object to handlebars
let displayAlbums = function(albums){
    $('.landing-div').hide();
    $('.content').html('');
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
  console.log(albums);
    $('.content').append(albumsDisplayTemplate({
      albums : albums.albums
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
      //adds album info to the album cover fields
      $('#albumCoverTitle').val($(this).find('.album-title').text());
      $('#albumCoverArtist').val($(this).find('.album-artist').text());
      if ($('.cover-image').attr('src') !== ''){
        $('.delete-cover').show();
      }
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
    console.log('get albums success');
    console.log(albums);
    displayAlbums(albums);

  });
};


//API outcomes


//User
const signUpSuccess = () => {
  console.log('signed-up');
  $('#signUpModal').modal('hide');
  $('.sign-up-error').text('');
  $('.open-signup').hide();
  $('.open-signin').text('Come on in');
};

const signUpFail = () => {
  console.log('sign up fail');
  $('.sign-up-error').text('Invalid info');
};

const signInSuccess = (data) => {
  console.log('signed-in');
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  currentUser.username = data.user.username;
  $('.dropdown-toggle').text(currentUser.username);
  //show/hide user CRUD options
  $('#signInModal').modal('hide');
  $('.landing').hide();
  $('#dropdown').show();
  //display user's albums on sign-in
  getAlbums();
  //change background
  $('body').addClass(setBackground());
};

const signInFail = () => {
  console.log('sign up fail');
  $('.sign-in-error').text('Invalid info');
};

const changePasswordSuccess = () => {
  console.log('changed password');
  $('#changePasswordModal').modal('hide');
};

const signOutSuccess = () => {
  currentUser.token = '';
  currentUser.id = undefined;
  //show/hide user CRUD options and clear albums + username
  $('body').removeClass(currentBackground);
  $('.content').html('');
  $('.landing').show();
  $('.open-signup').show();
  $('.open-signin').text('Been here before?');
  console.log('signed out');
  $('#dropdown').hide();

};







//Album
const newAlbumSuccess = () => {
  console.log('new album success');
  $('#newAlbumModal').modal('hide');
  $('.delete-cover').hide();
  getAlbums();
};

const editAlbumSuccess = () => {
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  console.log('edit ablum success');
  getAlbums();
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
  getAlbums();
};

const deleteCoverSuccess = () => {
  console.log('cover deleted');
  $('.delete-cover').hide();
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  getAlbums();
};




const failure = (error) => {
  console.log("fail");
  console.log(error);
};


module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  signOutSuccess,
  newAlbumSuccess,
  editAlbumSuccess,
  deleteAlbumSuccess,
  deleteCoverSuccess,
  failure,
  currentUser
};
