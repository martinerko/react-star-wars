// src/constants/actionTypes.js
import defineAction from './defineAction';
import { SUCCESS, ERROR } from './actionResults';

export const FETCH_CHARACTERS = defineAction('FETCH_CHARACTERS', [SUCCESS, ERROR]);
export const FETCH_CHARACTER_DETAIL = defineAction('FETCH_CHARACTER_DETAIL', [SUCCESS, ERROR]);
export const FETCH_PLANETS = defineAction('FETCH_PLANETS', [SUCCESS, ERROR]);
export const FETCH_PLANET_DETAIL = defineAction('FETCH_PLANET_DETAIL', [SUCCESS, ERROR]);
export const UPDATE_CHARACTER_VOTES = defineAction('UPDATE_CHARACTER_VOTES', [SUCCESS, ERROR]);
export const UPDATE_CHARACTER_COMMENT = defineAction('UPDATE_CHARACTER_COMMENT', [SUCCESS, ERROR]);
export const FETCH_VOTED_CHARACTERS = defineAction('FETCH_VOTED_CHARACTERS', [SUCCESS, ERROR]);
export const RESET_CHARACTERS = defineAction('RESET_CHARACTERS');
export const SEARCH_CHARACTERS = defineAction('SEARCH_CHARACTERS', [SUCCESS, ERROR]);
export const RESET_SEARCH = defineAction('RESET_SEARCH');
