'use strict';

const app = require('../app-data');

//displayAlbums function used in getAlbums api call. Passes albums object to handlebars. Called by getAblums
let displayAlbums = function(albums){
    $('.landing-div').hide();
    $('.content').html('');
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
    $('.content').html(albumsDisplayTemplate({
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

let getAlbums = function(){
  $.ajax({
    method: "GET",
    url: app.api + 'users/' + app.currentUser.id + '/albums',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + app.currentUser.token
    }
  }).done(function(albums){
    console.log('get albums success');
    displayAlbums(albums);
  });
};


const newAlbumSuccess = () => {
  console.log('new album success');
  $('#newAlbumModal').modal('hide');
  $('.delete-cover').hide();
  getAlbums();
};

const newAlbumFailure = (data) => {
  console.log(data);
  $('.new-album-error').text("Cannot add album");
};

//Album CRUD
const newAlbum = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'users/' + app.currentUser.id +'/albums/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + app.currentUser.token
    },
    data: {
      "album": {
        "title": data.album.title,
        "artist": data.album.artist,
        "thoughts": data.album.thoughts
      }
    }
  })
  .done(success)
  .fail(failure);
};

const editAlbumSuccess = () => {
  console.log("edit album success reached");
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  console.log('edit ablum success');
  getAlbums();
};

const editAlbumFailure = () => {
  console.log('edit album failure');
};

//Update Album
const editAlbum = (success, failure, data) => {
  console.log('edit album reached');
  let album_id = localStorage.getItem('ID');
 $.ajax({
   method: 'PATCH',
   url: app.api + 'albums/' + album_id,
   data: {
     "album": {
       "title": data.album.title,
       "artist": data.album.artist,
       "thoughts": data.album.thoughts
     }
   },
   headers:{
     Authorization: "Token token=" + app.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
  getAlbums();
};


//Delete Album
const deleteAlbum = (success, failure) => {
  let album_id = localStorage.getItem('ID');
  $.ajax({
    method: 'DELETE',
    url: app.api + 'albums/' + album_id,
    headers: {
      Authorization: 'Token token=' + app.currentUser.token
    },
  }).done(success)
  .fail(failure);
};

//function to adjust user input to api naming conventions
let prepareData = function(name){
  name = name.split(' ');
  name = name.join('+');
  return name;
};

//Request to lastfm API
const getAlbumCover = (success, failure, data) => {
  console.log('album-api reached');
  let preparedArtist = prepareData(data.album.artist);
  let preparedAlbum = prepareData(data.album.title);
  $.ajax({
    url: app.lastFm + preparedArtist + '&album=' + preparedAlbum + '&format=json'
  }).done(success)
  .fail(failure);
};

//Patch request for album cover
const albumCoverPatch = (success, failure, data) => {
  console.log('album cover patch reached');
  let album_id = localStorage.getItem('ID');
 $.ajax({
   method: 'PATCH',
   url: app.api + 'albums/' + album_id,
   data: {
     "album": {
       "cover": data,
     }
   },
   headers:{
     Authorization: "Token token=" + app.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};

//Tests if returned image is valid, then runs edit album success in ui, which clears local storage, hides modals and runs getAlbums()
const albumCoverSuccess = (data) => {
  console.log("cover success", data);
  if (data.message === "Album not found"){
    $('.album-cover-error').text("Album not found");
  }
  //tests for specific lastFM error image
  else if(data.album.image[3]['#text'] === 'http://img2-ak.lst.fm/i/u/300x300/0febc90a297f4dc792371d0418adf9c5.png'){
    $('.album-cover-error').text("Album cover is unavailable from lastFM");
  //checks for album error or unavailable before calling the patch request
  }else if(data.album !== undefined && data.album.image[3]['#text'] !== '' ){
    $('.album-cover-error').text("");
    let albumCoverValue = data.album.image[3]['#text'];
    albumCoverPatch(editAlbumSuccess, editAlbumFailure, albumCoverValue);
    $('.delete-album').show();
  }else {
    $('.album-cover-error').text("Album cover is unavailable");
  }
};

const deleteCoverSuccess = () => {
  console.log('cover deleted');
  $('.delete-cover').hide();
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  getAlbums();
};

const deleteCover = (success, failure) => {
  console.log('delete cover ajax');
  let album_id = localStorage.getItem('ID');
 $.ajax({
   method: 'PATCH',
   url: app.api + 'albums/' + album_id,
   data: {
     "album": {
       "cover": '',
     }
   },
   headers:{
     Authorization: "Token token=" + app.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};

module.exports = {
  newAlbum,
  newAlbumSuccess,
  newAlbumFailure,
  getAlbums,
  editAlbum,
  editAlbumSuccess,
  editAlbumFailure,
  deleteAlbum,
  deleteAlbumSuccess,
  getAlbumCover,
  albumCoverSuccess,
  albumCoverPatch,
  deleteCover,
  deleteCoverSuccess
};
