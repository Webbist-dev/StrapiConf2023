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
          id: 'Settings Demo',
          defaultMessage: 'This is an example plugin',
        },
      },
      [
        {
          intlLabel: {
            id: 'Settings Demo',
            defaultMessage: 'This is an example plugin',
          },
          id: 'demo-settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return await import(
            /* webpackChunkName: "settingsDemo" */ './pages/Settings'
            );
          }
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
