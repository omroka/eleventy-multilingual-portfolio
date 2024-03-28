// holds all our metadata for the website (used in the <head> of layouts/base.njk for example)
module.exports = {
    url: process.env.URL || 'YourSiteUrl', //for absolut urls
    siteName: 'YourSiteName',
    siteDescription:
      "YourWebsiteDefaultDescription",
    ogImage: '/opengraph.png'
  };