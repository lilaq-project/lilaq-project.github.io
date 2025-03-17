import type { LoadContext, OptionValidationContext, Plugin, PluginOptions } from '@docusaurus/types';
// import { Joi } from '@docusaurus/utils-validation';

export type SimpleAnalyticsPluginOptions = { domain?: string };

// const optionsSchema = Joi.object<SimpleAnalyticsPluginOptions>({ domain: Joi.string().hostname() });

export default function pluginSimpleAnalytics(context: LoadContext, options: PluginOptions): Plugin {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-simple-analytics',

    injectHtmlTags() {
      const domain = options?.domain;
      if (!isProd) {
        return {};
      }

      const scriptDomain = domain || 'scripts.simpleanalyticscdn.com';
      const noScriptDomain = domain || 'queue.simpleanalyticscdn.com';

      return {
        postBodyTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              defer: true,
              src: `https://${scriptDomain}/latest.js`,
            },
          },
          {
            tagName: 'noscript',
            innerHTML: `<img src="https://${noScriptDomain}/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" />`,
          },
        ],
      };
    },
  };
}

// export function validateOptions({
//   options,
//   validate,
// }: OptionValidationContext<SimpleAnalyticsPluginOptions, SimpleAnalyticsPluginOptions>) {
//   return validate(optionsSchema, options);
// }
