"use strict";

// Importing the required functions
const pluginId = require("../utils/pluginId");
const { createCoreController } = require('@strapi/strapi').factories;

// Creating the core controller
module.exports = createCoreController('plugin::settings-demo.config', () => ({
  // Function to get the configuration
  getConfig: async () => {
    // Call the getConfig function from the plugin service
    return strapi.plugin(pluginId).service('handleConfig').getConfig();
  },
  // Function to set the configuration
  setConfig: async (ctx) => {
    // Call the setConfig function from the plugin service with the request body as the parameter
    return strapi.plugin(pluginId).service('handleConfig').setConfig(ctx.request.body);
  }
}));