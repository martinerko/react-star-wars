import * as types from '../constants/actionTypes';

const INITIAL_STATE_ALL = {
  count: 0,
  isFetching: false,
  data: {},
  nextUrl: 'https://swapi.co/api/people/?page=1',
  searchTerm: '',
  error: null
};

let data;

const updateCharactersData = (stateData, characterData, changes) => {
  const item = {
    ...characterData,
    // defaults
    updatingScore: false,
    error: null,
    ...changes,
  };
  return {
    ...stateData,
    [characterData.id]: item
  };
}

const charactersReducer = (state = INITIAL_STATE_ALL, action) => {
  switch (action.type) {
    case types.FETCH_VOTED_CHARACTERS.ACTION:
    case types.FETCH_CHARACTERS.ACTION:
      return {
        ...state,
        isFetching: true,
        error: null
      };

    case types.RESET_CHARACTERS.ACTION:
      return {
        ...INITIAL_STATE_ALL
      };

    case types.FETCH_VOTED_CHARACTERS.SUCCESS:
    case types.FETCH_CHARACTERS.SUCCESS: {
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
    case types.FETCH_VOTED_CHARACTERS.ERROR:
    case types.FETCH_CHARACTERS.ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case types.UPDATE_CHARACTER_VOTES.ACTION: {
      data = updateCharactersData( //
        state.data, //orig data about all characters
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
      return state;
  }
};

export { charactersReducer, updateCharactersData };
