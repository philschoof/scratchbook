'use strict';

const modalEventHandlers = require('./auth/modal-handlers');
const userEventHandlers = require('./auth/user-handlers');
const albumEventHandlers = require('./auth/album-handlers');


$(() => {
  modalEventHandlers.modalEventHandlers();
  userEventHandlers.userEventHandlers();
  albumEventHandlers.albumEventHandlers();
});
