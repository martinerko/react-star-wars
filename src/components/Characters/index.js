import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import CharacterCard from '../CharacterCard';
import { fetchCharacters } from '../../actions/starwars';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  votedCharactersLoaded: PropTypes.bool.isRequired,
  characters: PropTypes.object.isRequired
};

class Characters extends Component {
  constructor(props) {
    super(props);

    this.loadItems = this.loadItems.bind(this);
  }

  loadItems(pageNumber) {
    // console.log('loading: ' + pageNumber);
    this.props.dispatch(fetchCharacters({
      pageNumber
    }));
  }

  renderTitle() {
    return <h1>Star Wars Heroes</h1>
  }

  renderCharacters() {
    const {characters, dispatch} = this.props;
    const {data, order} = characters;
    return order.map(characterId => {
      return <CharacterCard key={`character-${characterId}`} character={data[characterId]} dispatch={dispatch} />
    });
  }

  renderGrid() {
    if (!this.props.votedCharactersLoaded) {
      return null;
    }

    const {hasMore, pageStart, order} = this.props.characters;
    if (!(hasMore || order.length)) {
      return <p className="no-results">No heroes found....</p>;
    }
    return (
      <InfiniteScroll className="thumbnails" useWindow={true} pageStart={pageStart} loadMore={this.loadItems} hasMore={hasMore}>
        {this.renderCharacters()}
      </InfiniteScroll>
    )
  }

  render() {
    return (
      <main>
        {this.renderTitle()}
        {this.renderGrid()}
      </main>
    )
  }
}

Characters.propTypes = propTypes;

export default Characters;
