const rp = require('request-promise');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const databankReducer = (csm, {slug, title, base_images}) => {
  csm[title] = {
    slug,
    image: base_images.desktop['ratio_1x1']
  };
  return csm;
};

const createMeta = (count, filter) => {
  const feedsToFetch = [];
  for (let offset = 0; offset <= count; offset += 40) {
    feedsToFetch.push(`http://www.starwars.com/_grill/filter/databank?filter=${filter}&mod=4&offset=${offset}`);
  }

  Promise.map(feedsToFetch, feed => download(feed))
    .then(results => {
      const items = Array.prototype.concat.apply([], results);
      return items.reduce((map, currentSet) => {
        return Object.assign(map, currentSet.data.reduce(databankReducer, {}));
      }, {});
    })
    .then(map => {
      const json = JSON.stringify(map);
      fs.writeFileSync(path.join(__dirname, `${filter}.json`), json, 'utf8');
      return map;
    })
    .then(map => console.log('%s: %d', filter, Object.keys(map).length))
    .catch(err => console.log(err));
};

const download = (uri) => {
  return rp({
    uri,
    json: true
  });
};

createMeta(164, 'Locations');
createMeta(553, 'Characters');
