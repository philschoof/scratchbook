'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js');

// styles
require('./assets/styles/index.scss');

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

// attach getFormFields globally

require('expose?getFormFields!./lib/get-form-fields.js');

$('.open-signup').on('click', function(event){
  event.preventDefault();
  $('#signUpModal').modal('show');
});

$('.open-signin').on('click', function(event){
  event.preventDefault();
  $('#signInModal').modal('show');
});

$('.password').on('click', function(event){
  event.preventDefault();
  $('#changePasswordModal').modal('show');
});

// $('.edit-album').on('click', function(event){
//   console.log('edit clicked')
//   event.preventDefault();
//   $('#editAlbumModal').modal('show');
// });

// $(document).on("click", ".edit-album", function(event){
//   event.preventDefault();
//   localStorage.setItem('ID', $(this).attr('data-attribute'));
//   $('#editAlbumModal').modal('show');
// });
