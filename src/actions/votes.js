import { createAction } from 'redux-actions';

import { FETCH_VOTED_CHARACTERS, UPDATE_CHARACTER_VOTES } from '../constants/actionTypes';
import * as services from '../services/starwars';

// increment/decrement votes of given character
export const updateCharacterVotes = (character, score) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(updateCharacterVotesInProgress(character));
    services.updateCharacterVotes(getState, getFirebase, character, score)
      .then(updatedCharacter => dispatch(updateCharacterVotesSuccess(updatedCharacter)))
      .catch(error => dispatch(updateCharacterVotesError({
        ...character,
        error
      })));
  };
};

export const updateCharacterVotesInProgress = createAction(UPDATE_CHARACTER_VOTES.ACTION);
export const updateCharacterVotesSuccess = createAction(UPDATE_CHARACTER_VOTES.SUCCESS);
export const updateCharacterVotesError = createAction(UPDATE_CHARACTER_VOTES.ERROR);

// fetch all voted characters
export const fetchVotedCharacters = () => {
  return (dispatch, getState, getFirebase) => {
    dispatch(fetchVotedCharactersInProgress());
    services.fetchVotedCharacters(getState, getFirebase)
      .then(data => dispatch(fetchVotedCharactersSuccess({
        data
      })))
      .catch(error => dispatch(fetchVotedCharactersError({
        error
      })));
  };
};

export const fetchVotedCharactersInProgress = createAction(FETCH_VOTED_CHARACTERS.ACTION);
export const fetchVotedCharactersSuccess = createAction(FETCH_VOTED_CHARACTERS.SUCCESS);
export const fetchVotedCharactersError = createAction(FETCH_VOTED_CHARACTERS.ERROR);
