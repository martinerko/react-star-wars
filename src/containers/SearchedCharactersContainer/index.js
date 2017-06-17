import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchVotedCharacters } from '../../actions/votes';
import { compareCharactersState } from '../../helpers/comparators';
import { enhanceSearchedCharacters } from '../../selectors';

import SearchedCharacters from '../../components/SearchedCharacters';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  votedCharactersLoaded: PropTypes.bool.isRequired,
  characters: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired
};

class SearchedCharactersContainer extends Component {
  componentDidMount() {
    const {dispatch, votedCharactersLoaded} = this.props;
    if (!votedCharactersLoaded) {
      dispatch(fetchVotedCharacters());
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.searchTerm !== nextProps.searchTerm) {
      return true;
    }
    return compareCharactersState(this.props, nextProps);
  }

  render() {
    const {dispatch, characters, votedCharactersLoaded, searchTerm} = this.props;
    return (
      <SearchedCharacters dispatch={dispatch} searchTerm={searchTerm} characters={characters} votedCharactersLoaded={votedCharactersLoaded} />
    )
  }
}

SearchedCharactersContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    votedCharactersLoaded: state.votedCharacters.loaded,
    characters: enhanceSearchedCharacters(state),
    searchTerm: state.searchedCharacters.searchTerm
  };
};

export default connect(mapStateToProps)(SearchedCharactersContainer);
