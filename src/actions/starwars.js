import { createAction } from 'redux-actions';

import * as services from '../services/starwars';
import { FETCH_CHARACTERS, FETCH_CHARACTER_DETAIL, UPDATE_CHARACTER_COMMENT } from '../constants/actionTypes';

// all characters
export const fetchCharacters = (query) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(fetchCharactersInProgress());
    return services.fetchCharacters(getState, getFirebase, query)
      .then(response => dispatch(fetchCharactersSuccess(response)))
      .catch(error => dispatch(fetchCharactersError(error)));
  };
};

export const fetchCharactersInProgress = createAction(FETCH_CHARACTERS.ACTION);
export const fetchCharactersSuccess = createAction(FETCH_CHARACTERS.SUCCESS);
export const fetchCharactersError = createAction(FETCH_CHARACTERS.ERROR);

// single character detail
export const fetchCharacterDetail = (query) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(fetchCharacterDetailInProgress());
    return services.fetchCharacterDetail(getState, getFirebase, query)
      .then(response => dispatch(fetchCharacterDetailSuccess(response)))
      .catch(error => dispatch(fetchCharacterDetailError(error)));
  };
};

export const fetchCharacterDetailInProgress = createAction(FETCH_CHARACTER_DETAIL.ACTION);
export const fetchCharacterDetailSuccess = createAction(FETCH_CHARACTER_DETAIL.SUCCESS);
export const fetchCharacterDetailError = createAction(FETCH_CHARACTER_DETAIL.ERROR);

// update character comment
export const updateCharacterComment = (character, comment) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(updateCharacterCommentInProgress());
    return services.updateCharacterComment(getState, getFirebase, character, comment)
      .then(response => dispatch(updateCharacterCommentSuccess(response)))
      .catch(error => dispatch(updateCharacterCommentError(error)));
  };
};

export const updateCharacterCommentInProgress = createAction(UPDATE_CHARACTER_COMMENT.ACTION);
export const updateCharacterCommentSuccess = createAction(UPDATE_CHARACTER_COMMENT.SUCCESS);
export const updateCharacterCommentError = createAction(UPDATE_CHARACTER_COMMENT.ERROR);
