'use strict';

// use require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled

const modalEventHandlers = require('./auth/modal-handlers');
const userEventHandlers = require('./auth/user-handlers');
const albumEventHandlers = require('./auth/album-handlers');


$(() => {
  modalEventHandlers.modalEventHandlers();
  userEventHandlers.userEventHandlers();
  albumEventHandlers.albumEventHandlers();
});
