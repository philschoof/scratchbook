'use strict';

const albumApi = require('./album-api');
const albumUi = require('./album-ui');
const getFormFields = require('../../../lib/get-form-fields');

const albumEventHandlers = () => {
  $('#new-album').on('submit', function(event){
    let data = getFormFields(this);
    event.preventDefault();
    albumApi.newAlbum(albumUi.newAlbumSuccess, albumUi.newAlbumFail, data);
  });

  $('#edit-album-form').on('submit', function(event){
    event.preventDefault();
    let data = getFormFields(this);
    albumApi.editAlbum(albumApi.editAlbumSuccess, albumApi.editAlbumFailure, data);
  });

  $('#album-cover-form').on('submit', function(event){
    let data = getFormFields(this);
    console.log(data);
    event.preventDefault();
    albumApi.getAlbumCover(albumApi.albumCoverSuccess, albumUi.failure, data);
  });

  $('#deleteAlbumConfirm').on('click', function(event){
    let data = getFormFields(this);
    event.preventDefault();
    albumApi.deleteAlbum(albumUi.deleteAlbumSuccess, albumUi.failure, data);
  });

  $('.delete-cover').on('click', function(event) {
    console.log("delete cover clicked");
    event.preventDefault();
    albumApi.deleteCover(albumApi.deleteCoverSuccess, albumUi.failure);
  });
};

module.exports = {
  albumEventHandlers
};