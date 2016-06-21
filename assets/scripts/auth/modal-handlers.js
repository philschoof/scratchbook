'use strict';

const modalEventHandlers = () => {
  $('.open-signup').on('click', function(event){
    event.preventDefault();
    $('.sign-up-error').hide();
    $('#signUpModal').modal('show');
  });

  $('.open-signin').on('click', function(event){
    event.preventDefault();
    $('.sign-in-error').hide();
    $('#signInModal').modal('show');
  });

  $('.open-change-password').on('click', function(event){
    event.preventDefault();
    $('#changePasswordModal').modal('show');
  });

  $('.delete-album-modal-button').on('click', function(event) {
    event.preventDefault();
    $('#deleteAlbumModal').modal('show');
  });

  $('.album-cover-modal').on('click', function(event) {
    event.preventDefault();
    //to clear residual error messages
    $('.album-cover-error').text('');
    $('#albumCoverModal').modal('show');
  });
};

module.exports = {
  modalEventHandlers
};
