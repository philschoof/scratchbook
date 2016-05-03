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
  .done(success)
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




//Album CRUD
const newAlbum = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'users/' + ui.currentUser.id +'/albums/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + ui.currentUser.token
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

//Read albums is attached to sign-in succes in auth/ui


//Update Album
const editAlbum = (success, failure, data) => {
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
     Authorization: "Token token=" + ui.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};


//Delete Album
const deleteAlbum = (success, failure) => {
  let album_id = localStorage.getItem('ID');
  $.ajax({
    method: 'DELETE',
    url: app.api + 'albums/' + album_id,
    headers: {
      Authorization: 'Token token=' + ui.currentUser.token
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
  let preparedArtist = prepareData(data.album.artist);
  let preparedAlbum = prepareData(data.album.title);
  $.ajax({
    url: app.lastFm + preparedArtist + '&album=' + preparedAlbum + '&format=json'
  }).done(success)
  .fail(failure);
};

//Patch request for album cover
const albumCoverPatch = (success, failure, data) => {
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
     Authorization: "Token token=" + ui.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};

//Tests if returned image is valid, then runs edit album success in ui, which clears local storage, hides modals and runs getAlbums()
const albumCoverSuccess = (data) => {
  console.log(data);
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
    albumCoverPatch(ui.editAlbumSuccess, ui.failure, albumCoverValue);
    $('.delete-album').show();
  }else {
    $('.album-cover-error').text("Album cover is unavailable");
  }
};

const deleteCover = (success, failure) => {
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
     Authorization: "Token token=" + ui.currentUser.token,
   }
 }).done(success)
 .fail(failure);
};





module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  newAlbum,
  editAlbum,
  deleteAlbum,
  getAlbumCover,
  albumCoverSuccess,
  albumCoverPatch,
  deleteCover
};
