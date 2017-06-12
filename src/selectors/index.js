import { createSelector } from 'reselect'
import reduce from 'lodash.reduce';

import { sortByScore } from '../helpers/common';

const REGEXP_NUMBERS_ONLY = /[^0-9]+/g;
const charactersSelector = (state) => state.characters;
const characterDetailSelector = (state) => state.detail;
const searchedCharactersSelector = (state) => state.searchedCharacters;

const totalScoreSelector = createSelector(
  [charactersSelector],
  ({data}) => {
    return reduce(data, (total, {score}) => total + score, 0);
  }
);

const overalScoreSelector = createSelector(
  [characterDetailSelector, totalScoreSelector],
  ({score}, totalScore) => calculateOveralScore(score, totalScore)
);

const calculateOveralScore = (score, totalScore) => score ? Number(score / totalScore).toFixed(2) : 0;

export const enhanceCharacterDetail = createSelector(
  [characterDetailSelector, overalScoreSelector],
  (character, overallScore) => {
    return {
      ...character,
      overallScore
    }
  }
);

const enhancer = (characters, totalScore) => {
  const {nextUrl, data} = characters;
  const hasMore = typeof nextUrl === 'string';
  const pageStart = hasMore ? Number(nextUrl.replace(REGEXP_NUMBERS_ONLY, '')) - 1 : 0;

  const enhancedData = reduce(data, (map, detail) => {
    return {
      ...map,
      [detail.id]: {
        ...detail,
        overallScore: calculateOveralScore(detail.score, totalScore)
      }
    };
  }, {});

  // store the order in special array for easy comparision
  // sort them based on the score and then natively as they came in
  // ...(assuming the server serves sorted by id)
  const order = Object.keys(enhancedData)
    .map(key => enhancedData[key])
    .sort(sortByScore)
    .map(item => item.id); //get their ids

  return {
    ...characters,
    pageStart,
    hasMore,
    nextUrl,
    data: enhancedData,
    order
  };
};



export const enhanceCharacters = createSelector(
  [charactersSelector, totalScoreSelector],
  enhancer
);

export const enhanceSearchedCharacters = createSelector(
  [searchedCharactersSelector, totalScoreSelector],
  enhancer
);
