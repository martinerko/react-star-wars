import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { updateCharacterVotes } from '../../actions/votes';
import { IMAGE_LOADER_SMALL_SRC } from '../../constants/config';
import './index.css';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired
};

class CharacterCard extends Component {
  constructor(props) {
    super(props);

    this.incrementVotes = this.incrementVotes.bind(this);
    this.decrementVotes = this.decrementVotes.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const same = isEqual(this.props.character, nextProps.character);
    return !same;
  }

  incrementVotes() {
    const {dispatch, character} = this.props;

    dispatch(updateCharacterVotes(character, character.score + 1));
  }

  decrementVotes() {
    const {dispatch, character} = this.props;

    dispatch(updateCharacterVotes(character, character.score - 1));
  }

  render() {
    const {name, id, image, score, overallScore, updatingScore} = this.props.character;
    const disabledDownvote = score === 0 || updatingScore;
    const disabledUpvote = updatingScore;

    return (
      <figure className="thumbnail">
        <div className="overall-score" aria-label="Overall Score">{overallScore}</div>
        <Link to={`/character/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <figcaption>{name}</figcaption>
        <div className="votes-panel">
          <button disabled={disabledDownvote} className="fa fa-thumbs-down" onClick={this.decrementVotes} aria-label="downvote"> </button>
          <div className="score" aria-label="Score">{updatingScore ? <img src={IMAGE_LOADER_SMALL_SRC} alt="loading score" /> : score}</div>
          <button disabled={disabledUpvote} className="fa fa-thumbs-up" onClick={this.incrementVotes} aria-label="upvote"> </button>
        </div>
      </figure>
    )
  }
}

CharacterCard.propTypes = propTypes;

export default CharacterCard;
