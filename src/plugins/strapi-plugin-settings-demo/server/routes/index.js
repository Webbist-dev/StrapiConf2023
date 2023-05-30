'use strict';

module.exports = [
  {
    method: "GET",
    path: "/settings",
    handler: "settingsController.getConfig",
    config: { policies: [], auth: false }
  },
  {
    method: "POST",
    path: "/settings",
    handler: "settingsController.setConfig",
    config: { policies: [], auth: false }
  },
];