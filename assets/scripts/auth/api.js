'use strict';

const app = require('../app-data');
const ui = require('./ui');


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

const newAlbum = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'albums',
    data: {
    "album": {
      "title": data.album.title,
      "artist": data.album.artist,
      "user_id": ui.currentUser.id
    },
    headers: {
      Authorization: "Token token=" + ui.currentUser.token
    }}
  })
  .done(success)
  .fail(failure);
};

//Read albums
let displayAlbums = function(albums){
  let albumsDisplayTemplate = require('../templates/albums-display.handlebars');
    $('.content').append(albumsDisplayTemplate({
      albums
    }));
};

let getAlbums = function(){
  $.ajax({
    url: app.api + '/albums/' + ui.currentUser.id,
    // method: 'GET',
    dataType: 'json'
  }).done(function(albums){
    displayAlbums(albums);
    console.log(albums);
  });
};


module.exports = {
  signUp,
  signIn,
  newAlbum,
  getAlbums,
  displayAlbums

};
