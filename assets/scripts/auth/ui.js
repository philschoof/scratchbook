'use strict';

const authApi = require('./api');



let currentUser = {
  token:'',
  id: undefined
};

//User
const signUpSuccess = (data) => {
  console.log('signed-up');
  console.log(data);
  $('#signUpModal').modal('hide');
};

const signInSuccess = (data) => {
  console.log('signed-in');
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(currentUser);
  $('#signInModal').modal('hide');
  //authApi.getAlbums();
};

const changePasswordSuccess = () => {
  console.log('changed password');
};

const signOutSuccess = () => {
  currentUser.token = '';
  currentUser.id = undefined;
  console.log('signed out');
};





//Album
const newAlbumSuccess = (data) => {
  console.log(data);
};

const editAlbumSuccess = (data) => {
  if(localStorage.getItem('ID')){
    localStorage.removeItem('ID');
  }
  console.log(data);
};

const deleteAlbumSuccess = () => {
  console.log('deleted');
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
