import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      isReady: false,
      name,
    });

    

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: 'Settings',
          defaultMessage: 'This is an example plugin showcasing how to setup plugin settings',
        },
      },
      [
        {
          intlLabel: {
            id: 'Settings',
            defaultMessage: 'Configuration',
          },
          id: 'demo-settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return await import(
            /* webpackChunkName: "navigation-settings" */ './pages/Settings'
            );
          },
          // permissions: pluginPermissions['settings.config'],
        },
      ]
    );
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
