/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Verizon Media',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: 'https://s.yimg.com/mi/verizonmedia/assets/images/verizon-logo-1.0.1.png',
    infoLink: 'https://www.verizonmedia.com/',
    pinned: true,
  },
  {
    caption: 'Dropbox',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: 'data:image/png;base64,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',
    infoLink: 'https://www.dropbox.com/',
    pinned: true,
  },
  {
    caption: 'Tinder',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: 'https://www.gotinder.com/images/tinderNewLogo.svg',
    infoLink: 'https://tinder.com/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'react-intl', // Title for your website.
  tagline: 'Internationalize React apps',
  url: 'https://formatjs.github.io', // Your website URL
  baseUrl: '/react-intl/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'react-intl',
  organizationName: 'formatjs',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'getting-started', label: 'Getting Started'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/formatjs.png',
  footerIcon: 'img/formatjs.png',
  favicon: 'img/formatjs.png',

  /* Colors for website */
  colors: {
    primaryColor: '#9e3861',
    secondaryColor: '#6e2743',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} FormatJS`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/formatjs/react-intl',
};

module.exports = siteConfig;
