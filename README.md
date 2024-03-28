# README

This template is for people with little coding experience who still want an affordable, manageable and very performant portfolio and/or blog website (unlike no-code tools). It aims for simplicity yet up-to-date best practices in term of accessibility, SEO, UI, speed and so on. It will be further updated with corrections and features based on feedbacks. It use the [Eleventy](https://www.11ty.dev/) site generator.

A complete list of the features is available below, but mainly it offers an simple way to manage images and write you content, in markdown and separated from code. The website appearance can easily be modified because no class is used in the CSS.

⚠️ It's a beta version, some things are broken for now (projects list). Also you're invited to review the code and clean it up with me.

## Table of content
- [Features](#features)
- [Getting started](#getting-started)
- [Config](#config)
- [Implementation notes](#implementation-notes)
- [Get help](#get-help)
- [Roadmap](#roadmap)

## Features

- Static website
  - No javascript, all pages are pre-rendered
  - Configured for EN and FR content but can support different or more languages
  - Write your website in Markdown or HTML or a mix to generate HTML pages
  - Use the first image in a web page as a thumbnail in another one with a simple shortcode
  - Local server with live reload to work on your website in realtime
- Generated pages and elements
  - Home, projects and about pages
  - `sitemap.xml`
  - `robots.txt`
  - 404 Content not found pages
  - .htaccess for redirects on Apache servers
  - "previous" / "next" links at the bottom of pages
- Multilingual
  - Use [elevent's i18n plugin](https://www.11ty.dev/docs/plugins/i18n/)
  - A folder for each language, name you pages as you want
  - Easily add new languages
  - Apache redirects to the correct root and 404 depending on the client's preferences
  - "This page is also available in" footer link
  - A language version list other available options using hreflang attribute
- Blazing fast
  - No javascript loading
  - Small CSS file size
  - System fonts
  - Optimized images
- Image optimization
  - Automatically generates multiple image formats and sizes from a single image
  - Serve the best image according to the client's device size
  - Simple markup in Mardown: ``{% image "name.png", "description" %}``
  - Modern image format conversion (AVIF) 
  - Images can be located anywhere
  - Images keep their name for SEO purposes
- Simple and customizable CSS
  - Classless CSS that works with any vanilla HTML / Markdown
  - Kept as simple as possible but versatile
  - Automatic dark and light theme
  - Uses [Harmony color palette](https://www.figma.com/community/file/1287828769207775946/harmony-accessible-ui-color-palette) for accessible and even color contrasts and easy color swap
  - Responsive font size and spacing
  - Simple grid system
  - Styling of the most used elements
  - Normalize browsers' styling

## Getting started

1. [Make sure you have Node.js installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Open your terminal, make a directory and navigate to it:
```
mkdir new-directory-name
cd new-directory-name
```

3. Clone this Repository
```
git clone https://github.com/omroka/eleventy-multilingual-portfolio/
```
4. Modify `src/_data/meta.js` with your own info (website url, website name, and a default description). _Optional:_ modify `eleventy.config.js` too with your own eleventy preferences

5. Install dependencies
```
npm install
```

6. Run Eleventy
Build to the `dist` folder and host on a local development server (`http://localhost:8080/`) to test your website:
```
npm start
```

Generate a ready-to-publish build to the `dist` folder:
```
npm run build
```

## Config

- Replaces the images in `src/public/favicon og/`. The og image is the default link preview when you share your website on social medias etc. Favicons and icons are for browsers' tabs, bookmarks etc. You can follow [this "how to" on favicons](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- Change `src/_data/languages/` depending on your website languages
- `.htaccess` file is used for redirects to the correct language. Change its content based on your website languages.
- to change the typeface: drop your font (.woff or .woff2) in `src/public/fonts/`. Then search and replace "YourFontName" in `src/public/css` by the name of the font. Verify that line 8 the url is matching with the file name, because it may not be the case.

## Implementation Notes

There will be an explanation of every file here

## Get help

This project is maintained by me, [@omroka](https://github.com/omroka). Feel free to reach me out, on Twitter, Discord or via the email displayed on my website.

## Roadmap

- ~~Next / previous links at the bottom of pages~~ done
- CSS updates: cleaning code and style changes
- Bundling CSS
- CSS minifier
- Breadcrumbs?
- Automatic link anchor for headings
- Atom and JSON feeds for RSS updates
- Tags system
- Draft categorization for pages (not rendered when building the website but only in preview)
- Webapp?