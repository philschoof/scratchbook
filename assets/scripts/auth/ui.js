'use strict';

let currentUser = {
  token:'',
  id: 0
};

const signUpSuccess = (data) => {
  console.log('signed-up');
  console.log(data);
};

const signInSuccess = (data) => {
  console.log('signed-in');
  console.log(data);
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(currentUser);

};

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
  newAlbumSuccess,
  failure,
  currentUser
};
