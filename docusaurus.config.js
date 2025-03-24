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
// import remarkCrossrefs from './src/remark/remark-crossrefs.js'


/** @type {import('@docusaurus/types').Config} */ 
const config = {
  title: 'Lilaq',
  tagline: 'Advanced data visualization in Typst',
  favicon: 'img/favicon.ico',
  titleDelimiter: "−",

  staticDirectories: ['static'],
  url: 'https://lilaq.org', // production url
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: 'lilaq-project', 
  projectName: 'lilaq-project.github.io', 
  deploymentBranch: "gh-pages",
  trailingSlash: false,

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
          // editUrl: 'https://github.com/lilaq-project/lilaq-project.github.io/tree/main/',
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
          beforeDefaultRemarkPlugins: [remarkTypst],
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/lilaq-project/lilaq-project.github.io/tree/main/',
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
      metadata: [
        {name: 'keywords', content: 'plotting, diagram, typst, lilaq, data, visualization'},
      ],
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Lilaq',
        logo: {
          alt: 'Lilaq Logo',
          src: 'img/typst-generated/logo.svg',
          className: 'logo'
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
            label: 'Ask',
            to: 'https://forum.typst.app/tag/lilaq',
            position: 'right'
          },
          {
            "aria-label": "GitHub repository",
            href: 'https://github.com/lilaq-project/lilaq',
            position: 'right',
            className: "navbar--github-link",
          },
        ],
      },
      docs: {

        sidebar: {
          // hideable: true,
          autoCollapseCategories: true,
        }
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick-start guide',
                to: '/docs/quickstart',
              },
              {
                label: 'Plot types',
                to: '/docs/plot-types',
              },
              {
                label: 'Tutorials',
                to: '/docs/category/tutorials',
              },
              {
                label: 'Reference',
                to: '/docs/category/reference',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Typst Forum',
                href: 'https://forum.typst.app/tag/lilaq',
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
        maxHeadingLevel: 4,
      },
      algolia: {
        appId: 'YOVHDCCGI4',
        apiKey: 'ab61d9b9a6530d8933d035feda6e4d77',
        indexName: 'lilaq',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search', // Optional: path for search page that enabled by default (`false` to disable it)
        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
      },

    }), // end themeConfig


  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [

    'plugin-simple-a',

  ]

};

export default config;
