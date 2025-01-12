// fnm env --use-on-cd | Out-String | Invoke-Expression
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// import { themes as prismThemes } from 'prism-react-renderer';
import { light as typstLight, dark as typstDark } from "./src/theme/typst.js";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkTypst from './src/remark/remark-typst.js'


/** @type {import('@docusaurus/types').Config} */ 
const config = {
  title: 'Lilaq',
  tagline: 'Data visualization in Typst',
  favicon: 'img/favicon.ico',

  staticDirectories: ['static', 'typst_renders'],
  // Set the production url of your site here
  url: 'https://lilaq-project.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lilaq-project', // Usually your GitHub org/user name.
  projectName: 'lilaq', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lilaq-project/lilaq-project.github.io/tree/main/',
          beforeDefaultRemarkPlugins: [remarkTypst],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lilaq-project/lilaq-project.github.io/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        pages: {
          beforeDefaultRemarkPlugins : [remarkTypst],
          // remarkPlugins: [remarkMath],
          // rehypePlugins: [rehypeKatex],
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Lilaq',
        logo: {
          alt: 'Lilaq Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Docs',
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
          },
          {
            label: 'News',
            to: '/blog',
            position: 'left'
          },
          {
            label: 'Cheat Sheet',
            to: '/cheat-sheet',
            position: 'left'
          },
          {
            "aria-label": "GitHub repository",
            href: 'https://github.com/lilaq-project/lilaq',
            position: 'right',
            className: "navbar--github-link",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Typst Forum',
                href: 'https://forum.typst.app/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'News',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/lilaq-project/lilaq',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Lilaq`,
      },
      prism: {
        // theme: prismThemes.github,
        // darkTheme: prismThemes.dracula,
        theme: typstLight,
        darkTheme: typstDark,
        // defaultLanguage: "typ"
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),

  markdown: {
    parseFrontMatter: async (params) => {
      // Reuse the default parser
      const result = await params.defaultParseFrontMatter(params);

      // Process front matter description placeholders
      // @ts-ignore
      result.frontMatter.description = result.frontMatter.description?.replaceAll('{{MY_VAR}}', 'MY_VALUE');

      // // Create your own front matter shortcut
      // if (result.frontMatter.i_do_not_want_docs_pagination) {
      //   result.frontMatter.pagination_prev = null;
      //   result.frontMatter.pagination_next = null;
      // }

      // // Rename an unsupported front matter coming from another system
      // if (result.frontMatter.cms_seo_summary) {
      //   result.frontMatter.description = result.frontMatter.cms_seo_summary;
      //   delete result.frontMatter.cms_seo_summary;
      // }

      return result;
    },
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

};

export default config;
