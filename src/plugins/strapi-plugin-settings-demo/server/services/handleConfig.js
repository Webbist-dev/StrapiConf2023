"use strict";

// Function to build the configuration object
const buildConfig = (strapi) => {
  // Getting the plugin configuration using the provided utility function
  const pluginConfig = strapi.plugin("settings-demo").config;
  
  // Extracting the token from the plugin configuration
  const token = pluginConfig("token");

  // If the token is not available, return undefined
  if (!token) {
    return undefined;
  }

  // Returning the configuration object with the token
  return {
    token
  };
};

// Exporting an object with getConfig and setConfig functions
module.exports = ({ strapi }) => ({
  // Function to get the configuration
  getConfig: async () => {
    // Building the configuration object
    const buildConfigResult = buildConfig(strapi);
    
    // Flag to determine if a request needs to be made to retrieve the token
    const shouldMakeRequest = !buildConfigResult;

    // Variable to store the token result
    let tokenResult = "";

    // If a request should be made, retrieve the token from the database
    if (shouldMakeRequest) {
      const results = await strapi.entityService.findOne('plugin::settings-demo.config', 1);

      // Accessing the token value from the results object, fallback to an empty string if it's not available
      tokenResult = results?.token ?? "";
    }

    // Generating the token to return based on the build configuration and the token result
    const tokenToReturn = buildConfigResult?.token ? `${buildConfigResult.token.substring(0, 6)}[...]` : tokenResult || buildConfigResult?.token;

    // Returning the configuration object with the token
    return {
      token: tokenToReturn
    };
  },
  // Function to set the configuration
  setConfig: async ({ token }) => {
    // Retrieving the current configuration from the database
    const config = await strapi.entityService.findOne('plugin::settings-demo.config', 1);

    // If the configuration already exists, update it with the new token
    if (config?.token) {
      return await strapi.entityService.update('plugin::settings-demo.config', 1, {
        data: {
          token
        }
      });
    }

    // If the configuration doesn't exist, create a new one with the provided token
    return await strapi.entityService.create('plugin::settings-demo.config', {
      data: {
        token
      }
    });
  }
});