import * as types from '../constants/actionTypes';
import { updateCharactersData } from './starwars';

const INITIAL_STATE_VOTED_CHARACTERS = {
  data: {},
  loaded: false,
  error: false
};
let data;

const votedCharactersReducer = (state = INITIAL_STATE_VOTED_CHARACTERS, action) => {
  switch (action.type) {
    case types.FETCH_VOTED_CHARACTERS.SUCCESS: {
      return {
        data: action.payload.data,
        loaded: true,
        error: null
      };
    }
    case types.FETCH_VOTED_CHARACTERS.ERROR: {
      return {
        ...state,
        loaded: true,
        error: action.payload
      };
    }
    case types.UPDATE_CHARACTER_VOTES.SUCCESS: {
      data = updateCharactersData( //
        state.data, //orig data about all characters
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
        state.data, //orig data about all characters
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
      return state
  }
};

export default votedCharactersReducer;
