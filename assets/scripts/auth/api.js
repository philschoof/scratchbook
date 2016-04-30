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
       "thoughts": data.album.thoughts,
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


module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  newAlbum,
  // getAlbums,
  // displayAlbums,
  editAlbum,
  deleteAlbum

};
