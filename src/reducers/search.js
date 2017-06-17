import * as types from '../constants/actionTypes';
import { updateCharactersData } from './starwars';

const INITIAL_STATE_ALL = {
  count: 0,
  isFetching: false,
  data: {},
  nextUrl: null,
  searchTerm: '',
  error: null
};

let data;

const searchCharactersReducer = (state = INITIAL_STATE_ALL, action) => {
  switch (action.type) {
    case types.RESET_SEARCH.ACTION:
      return {
        ...INITIAL_STATE_ALL
      };

    case types.SEARCH_CHARACTERS.ACTION:
      return {
        ...state,
        isFetching: true,
        searchTerm: action.payload.searchTerm,
        error: null
      };

    case types.SEARCH_CHARACTERS.SUCCESS: {
      const data = {
        ...state.data,
        ...action.payload.data
      };
      return {
        ...state,
        ...action.payload,
        data,
        isFetching: false,
        error: null
      };
    }
    case types.SEARCH_CHARACTERS.ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case types.UPDATE_CHARACTER_VOTES.ACTION: {
      data = updateCharactersData( //
        state.data, // orig data about all characters
        action.payload, // current data
        {
          updatingScore: true // + other changes
        }
      );

      return {
        ...state,
        data
      };
    }
    case types.UPDATE_CHARACTER_VOTES.SUCCESS: {
      data = updateCharactersData( //
        state.data, // orig data about all characters
        action.payload, // new data arrived with updated score
        {
          error: null
        }
      );

      return {
        ...state,
        data
      };
    }
    case types.UPDATE_CHARACTER_VOTES.ERROR: {
      data = updateCharactersData( //
        state.data, // orig data about all characters
        action.payload, // current data
        {
          error: action.payload.error // error that occured while performing change
        }
      );
      return {
        ...state,
        data
      };
    }
    default:
      return state;
  }
};

export default searchCharactersReducer;
