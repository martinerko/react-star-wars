import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { compareCharactersState } from '../../helpers/comparators';
import { fetchVotedCharacters } from '../../actions/votes';
import { enhanceCharacters } from '../../selectors';
import Characters from '../../components/Characters';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  votedCharactersLoaded: PropTypes.bool.isRequired,
  characters: PropTypes.object.isRequired
};

class CharactersContainer extends Component {
  componentDidMount() {
    const {dispatch, votedCharactersLoaded} = this.props;
    if (!votedCharactersLoaded) {
      dispatch(fetchVotedCharacters());
    }
  }

  shouldComponentUpdate(nextProps) {
    return compareCharactersState(this.props, nextProps);
  }

  render() {
    const {dispatch, characters, votedCharactersLoaded} = this.props;

    return (
      <Characters dispatch={dispatch} characters={characters} votedCharactersLoaded={votedCharactersLoaded} />
    )
  }
}

CharactersContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    votedCharactersLoaded: state.votedCharacters.loaded,
    characters: enhanceCharacters(state)
  };
};

export default connect(mapStateToProps)(CharactersContainer);
