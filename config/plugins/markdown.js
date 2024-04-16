const markdownIt = require('markdown-it');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
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
  ]);

  module.exports = markdownLib;

