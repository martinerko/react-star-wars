import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';

import { charactersReducer as characters } from './starwars';

import searchedCharacters from './search';
import votedCharacters from './votes';
import characterDetail from './characterDetail';

export default combineReducers({
  routing,
  firebase,
  characters,
  searchedCharacters,
  votedCharacters,
  characterDetail
});
