'use strict';

const app = {
  api:'https://serene-spire-31706.herokuapp.com/',
  // api:'http://localhost:3000/',
  //currentUser object set on successful sign-in
  currentUser : {
    token:'',
    id: 0,
    username: ''
  },
  albumId : 0
};

module.exports = app;
