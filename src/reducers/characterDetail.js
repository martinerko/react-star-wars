import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  updatingComment: false,
  error: null
};

const characterDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_CHARACTER_DETAIL.ACTION:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case types.FETCH_CHARACTER_DETAIL.SUCCESS:
      return {
        ...action.payload,
        isFetching: false,
        error: null
      };
    case types.FETCH_CHARACTER_DETAIL.ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.UPDATE_CHARACTER_COMMENT.ACTION:
      return {
        ...state, //orig data about all characters
        updatingComment: true,
        error: null
      };
    case types.UPDATE_CHARACTER_COMMENT.SUCCESS:
      return {
        ...state, //orig data about all characters
        ...action.payload,
        updatingComment: false,
        error: null
      };
    case types.UPDATE_CHARACTER_COMMENT.ERROR:
      return {
        ...state, //orig data about all characters
        error: action.payload,
        updatingComment: false
      };
    default:
      return state;
  }
};

export default characterDetailReducer;
