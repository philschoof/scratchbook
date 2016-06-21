'use strict';


const albumApi = require('./album-api');

const newAlbumSuccess = () => {
  console.log('new album success');
  $('#newAlbumModal').modal('hide');
  $('.delete-cover').hide();
  albumApi.getAlbums();
};

const newAlbumFail = (data) => {
  console.log(data);
  $('.new-album-error').text("Cannot add album");
};


//Edit album success and failure are in album-api

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
  albumApi.getAlbums();
};



const failure = () => {
  console.log('fail');
};


module.export = {
  newAlbumSuccess,
  newAlbumFail,
  deleteAlbumSuccess,
  failure
};
