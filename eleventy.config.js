const { DateTime } = require("luxon");

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const pluginImages = require("./eleventy.config.images.js");
// const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  // Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `dist/css/`
	eleventyConfig.addPassthroughCopy({
		"./src/public/css": "/css/",
    "./src/public/fonts": "/fonts",
    "./src/public/favicon og": "/",
	  });

    // Official plugins
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "en",
    });
    // eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    // App plugins
    eleventyConfig.addPlugin(pluginImages);

    //Filters
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
      // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
      return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    //when listing tags of a page, remove unrelevant tags like "post", "all", etc.
    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
      return (tags || []).filter(tag => ["all", "nav", "post", "posts", "project", "projects"].indexOf(tag) === -1);
    });

    // Get the first `n` elements of a collection.
	  eleventyConfig.addFilter("head", (array, n) => {
      if(!Array.isArray(array) || array.length === 0) {
        return [];
      }
      if( n < 0 ) {
        return array.slice(n);
      }

      return array.slice(0, n);
	  });

    // parse the collection two items at a time
    eleventyConfig.addFilter("chunk", function(array, size) {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    });

    eleventyConfig.addFilter('byLang', function(collection, lang = this.page.lang) {
      return collection.filter(item => {
        return item.data.page.lang === lang;
      });
    });

    //Extract first image from projects pages in order to display them as thumbnails on the main page of the website or elsewhere
    eleventyConfig.addShortcode('first_image', post => extractFirstImage(post));

    return {
      // Pre-process *.md files with:
      markdownTemplateEngine: "njk",
      // Pre-process *.html files with:
      htmlTemplateEngine: "njk",

      // These are all optional:
      dir: {
        input: "src",
        output: "dist"
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