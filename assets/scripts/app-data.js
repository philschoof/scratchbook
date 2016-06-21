'use strict';

const app = {
  api:'https://serene-spire-31706.herokuapp.com/',
  // api:'http://localhost:3000/',
  lastFm:'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=507b5d03b9f50c1d266bde3a5ef48fe0&artist=', //+ preparedArtist + '&album=' + preparedAlbum + '&format=json'
  //currentUser object set on successful sign-in
  currentUser : {
    token:'',
    id: 0,
    username: ''
  }
};

module.exports = app;
