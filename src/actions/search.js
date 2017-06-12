import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';

import * as services from '../services/starwars';
import { SEARCH_CHARACTERS, RESET_SEARCH } from '../constants/actionTypes';

export const searchCharacters = (query) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(searchCharactersInProgress(query));
    return services.fetchCharacters(getState, getFirebase, query)
      .then(response => dispatch(searchCharactersSuccess(response)))
      .then(() => browserHistory.push('/search'))
      .catch(error => dispatch(searchCharactersError(error)));
  }
}

// search characters
export const searchCharactersInProgress = createAction(SEARCH_CHARACTERS.ACTION);
export const searchCharactersSuccess = createAction(SEARCH_CHARACTERS.SUCCESS);
export const searchCharactersError = createAction(SEARCH_CHARACTERS.ERROR);

// reset search term
export const resetSearch = createAction(RESET_SEARCH.ACTION);
