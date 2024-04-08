const markdownIt = require('markdown-it');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');

const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true, //plain links become clickable
    typographer: true
  })
  .use(markdownItLinkAttributes, [
    {
      // match external links
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        rel: 'noopener'
      }
    }
  ])
  .use(markdownItAnchor, {
    tabIndex: false,
    slugify,
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'heading-anchor'
    })
  });

  module.exports = markdownLib;

