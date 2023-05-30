'use strict';

module.exports = {
  default: () => ({
    token: "",
  }),
  validator(config) {
    if (config.token && typeof config.token !== "string") {
      throw new Error("Config property `Token` has to be a string");
    }
  },
};
