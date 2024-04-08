const { DateTime } = require('luxon');

// Get the first `n` elements of a collection.
const head =  (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
};

// parse the collection two items at a time
const chunk = function(array, size) {
    const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
    return result;
    };

const readableDate = (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(format || 'dd LLLL yyyy');
};

const htmlDateString = (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
};

//when listing tags of a page, remove unrelevant tags like 'post', 'all', etc.
const filterTagList = function filterTagList(tags) {
    return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts', 'project', 'projects'].indexOf(tag) === -1);
};

const byLang = function(collection, lang = this.page.lang) {
    return collection.filter(item => {
        return item.data.page.lang === lang;
    });
};

module.exports = {
    head,
    chunk,
    readableDate,
    htmlDateString,
    filterTagList,
    byLang
};