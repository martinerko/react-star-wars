import ImagesMeta from './CharactersLocal.json';
import reduce from 'lodash.reduce';

const REGEXP_NUMBERS_ONLY = /[^0-9]+/g;

const resolveCharacterImage = (name) => {
  if (name in ImagesMeta) {
    return `${process.env.PUBLIC_URL}/img/characters/${ImagesMeta[name]}`;
  }
  return `${process.env.PUBLIC_URL}/img/characters/no-image.jpg`;
};

const normalizeCharacter = (character) => {
  const {name, url, score = 0, comment=''} = character;
  const id = url.replace(REGEXP_NUMBERS_ONLY, ''); //resolve character identifier
  const image = resolveCharacterImage(name); //resolve external image

  return {
    ...character,
    id,
    image,
    score,
    overallScore: 0,
    comment,
    error: null,
    updatingScore: false
  };
};

const normalizeCharacters = (data) => {
  //use lodash.reduce here sice voted characters stored in firebase are returned as an object
  //wheras data from service are returned as an array
  return reduce(data, (map, character) => {
    const item = normalizeCharacter(character);
    return {
      ...map,
      [item.id]: item
    };
  }, {});
};


const sortByScore = (a, b) => {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  }
  return a.id - b.id;
};


export { resolveCharacterImage, normalizeCharacters, normalizeCharacter, sortByScore }
