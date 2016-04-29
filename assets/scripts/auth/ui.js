'use strict';

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
  console.log(data);
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(currentUser);
  $('#signInModal').modal('hide');
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
  failure,
  currentUser
};
