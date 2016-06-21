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

const editAlbumSuccess = () => {
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  console.log('edit ablum success');
  albumApi.getAlbums();
};

const editAlbumFailure = () => {
  console.log('edit album failure');
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
  $('#deleteAlbumModal').modal('hide');
  $('#editAlbumModal').modal('hide');
  albumApi.getAlbums();
};

const deleteCoverSuccess = () => {
  console.log('cover deleted');
  $('.delete-cover').hide();
  $('#editAlbumModal').modal('hide');
  $('#albumCoverModal').modal('hide');
  albumApi.getAlbums();
};


module.export = {
  newAlbumSuccess,
  newAlbumFail,
  editAlbumSuccess,
  editAlbumFailure,
  deleteAlbumSuccess,
  deleteCoverSuccess
};
