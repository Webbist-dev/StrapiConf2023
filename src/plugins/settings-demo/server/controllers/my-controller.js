'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('settings-demo')
      .service('myService')
      .getWelcomeMessage();
  },
});
