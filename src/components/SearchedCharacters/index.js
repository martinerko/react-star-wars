import React from 'react';
import PropTypes from 'prop-types';

import Characters from '../Characters';
import { searchCharacters } from '../../actions/search';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  characters: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired
};

class SearchedCharacters extends Characters {
  loadItems(pageNumber) {
    const {dispatch, searchTerm} = this.props;
    // console.log('searching: %s - page #%d', searchTerm, pageNumber);
    dispatch(searchCharacters({
      searchTerm,
      pageNumber
    }));
  }

  renderTitle() {
    const {searchTerm} = this.props;
    if (!searchTerm) {
      return <h1>Search for your heroes!</h1>;
    }
    return <h1>Search results for: {searchTerm}</h1>;
  }
}

SearchedCharacters.propTypes = propTypes;

export default SearchedCharacters;
