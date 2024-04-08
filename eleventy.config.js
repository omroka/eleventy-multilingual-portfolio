const { EleventyI18nPlugin } = require('@11ty/eleventy');
const pluginImages = require('./eleventy.config.images.js');

// module import filters
const {
  head,
  chunk,
  readableDate,
  htmlDateString,
  filterTagList,
  byLang
} = require('./config/filters/index.js');

// plugins
const markdownLib = require('./config/plugins/markdown.js');

module.exports = function(eleventyConfig) {

  // 	--------------------- Plugins -----------------------
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  });
  eleventyConfig.setLibrary('md', markdownLib);
  // 	--------------------- Filters -----------------------
  eleventyConfig.addFilter('head', head);
  eleventyConfig.addFilter('readableDate', readableDate);
  eleventyConfig.addFilter('htmlDateString', htmlDateString);
  eleventyConfig.addFilter('filterTagList', filterTagList);
  eleventyConfig.addFilter('chunk', chunk);
  eleventyConfig.addFilter('byLang', byLang);

    // 	--------------------- Shortcodes -----------------------
  //Extract first image from projects pages in order to display them as thumbnails on the main page of the website or elsewhere
  eleventyConfig.addShortcode('first_image', post => extractFirstImage(post));

  // 	--------------------- Passthrough file copy -----------------------
  // Copy the contents of a folder to an output folder
  eleventyConfig.addPassthroughCopy({
    // copy to same path
    './src/public/css': '/css/',
    './src/public/fonts': '/fonts',
    // copy to root
    './src/public/favicon og': '/',
    });

  // 	--------------------- General config -----------------------
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true, // Show an IP url to view the website on your phone
  });

  return {
    // Pre-process *.md, *.html files with:
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
      input: 'src',
      output: 'dist'
    },
  };
};

//https://github.com/11ty/eleventy/issues/230
/**
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {String} the markup of the first image.
 */
function extractFirstImage(doc) {
  if (!doc.hasOwnProperty('templateContent')) {
    console.warn('❌ Failed to extract image: Document has no property `templateContent`.');
    return;
  }

  const content = doc.templateContent;

  if (content.includes('<picture>')) {
    const imgTagBegin = content.indexOf('<picture>');
    const imgTagEnd = content.indexOf('</picture>', imgTagBegin);

    return content.substring(imgTagBegin, imgTagEnd + 10);
  }

  return '';
}