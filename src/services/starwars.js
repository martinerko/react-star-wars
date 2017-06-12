import Promise from 'bluebird';

import { SERVER_URL } from '../constants/config';
import { normalizeCharacters, normalizeCharacter } from '../helpers/common';

// load characters from external API
export const fetchCharacters = (getState, getFirebase, {pageNumber = 1, searchTerm = ''}) => {
  const svc = `${SERVER_URL}/people/?search=${encodeURIComponent(searchTerm)}&page=${pageNumber}`;

  return fetch(svc)
    .then(response => response.json())
    .then(({next, results, count}) => {
      const votedCharacters = getState().votedCharacters.data;
      // normalize data by calculating missing info and coverting array into map
      const data = normalizeCharacters(results);
      //merge score from already preloaded characters from db into newly loaded data from service
      Object.keys(votedCharacters).forEach(key => {
        if (key in data) {
          data[key].score = votedCharacters[key].score
        }
      });

      return {
        count,
        nextUrl: next,
        data
      };
    });
};

export const updateCharacterVotes = (getState, getFirebase, character, score) => {
  //save only minimal data set
  const {id, url, name} = character;

  return getFirebase()
    .set(`/characters/votes/${id}`, {
      id,
      url,
      name,
      score
    })
    .then(() => {
      return {
        ...character,
        score
      }
    });
};

export const updateCharacterComment = (getState, getFirebase, character, comment) => {
  //save only minimal data set
  const {id, url, name} = character;

  return getFirebase()
    .set(`/characters/comments/${id}`, {
      id,
      url,
      name,
      comment
    })
    .then(() => {
      return {
        ...character,
        comment
      }
    });
};

// load voted characters from db
export const fetchVotedCharacters = (getState, getFirebase) => {
  return new Promise((resolve, reject) => {
    getFirebase()
      .ref('/characters/votes')
      .orderByChild('score')
      .once('value', snap => {
        //firebase returns an object instead of array...
        const results = [];
        if (snap) {
          snap.forEach((item) => {
            results.push(item.val())
          });
        }
        resolve(normalizeCharacters(results));
      })
      .catch(reject)
  });
};


const getVotesForCharacter = (getState, getFirebase, {characterId}) => {
  return new Promise((resolve, reject) => {
    getFirebase()
      .ref(`/characters/votes/${characterId}`)
      .once('value', snap => {
        const {score = 0} = snap.val() || {};
        resolve(score);
      })
      .catch(reject);
  });
};

const getCommentForCharacter = (getState, getFirebase, {characterId}) => {
  return new Promise((resolve, reject) => {
    getFirebase()
      .ref(`/characters/comments/${characterId}`)
      .once('value', snap => {
        const {comment = ''} = snap.val() || {};
        resolve(comment);
      })
      .catch(reject);
  });
};

const getPlanetInfo = (getState, getFirebase, {homeworld}) => {
  return fetch(homeworld)
    .then(response => response.json());
};

const checkIfCharacterExists = (item = {}, errorMessage) => {
  return item.name ? item : Promise.reject(new Error('Heroe not found :('));
};

export const fetchCharacterDetail = (getState, getFirebase, {characterId}) => {
  if (isNaN(characterId)) {
    return Promise.reject(new Error('Unknown heroe!'));
  }
  // always get fresh data from API
  //
  // if you want to return cached data, un-comment below section
  // const {searchedCharacters, characters} = getState();
  // const detail = characters.data[characterId] || searchedCharacters.data[characterId];
  // if (detail) {
  //   return Promise.resolve(detail);
  // }

  const svc = `${SERVER_URL}/people/${characterId}/`;
  return fetch(svc)
    .then(response => response.json())
    .then(checkIfCharacterExists)
    .then(character => {
      return Promise.props({
        score: getVotesForCharacter(getState, getFirebase, {characterId}),
        comment: getCommentForCharacter(getState, getFirebase, {characterId}),
        planetInfo: getPlanetInfo(getState, getFirebase, character)
      })
        .then(additionalInfo => {
          return {
            ...character,
            ...additionalInfo
          };
        });
    })
    .then(normalizeCharacter);
};
