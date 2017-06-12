import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { fetchCharacterDetail } from '../../actions/starwars';
import CharacterDetail from '../../components/CharacterDetail';
import { enhanceCharacterDetail } from '../../selectors';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  characterId: PropTypes.number.isRequired
}

class CharacterDetailContainer extends Component {
  componentDidMount() {
    const {dispatch, characterId} = this.props;
    dispatch(fetchCharacterDetail({
      characterId
    }));
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, characterId} = this.props;
    if (characterId !== nextProps.characterId) {
      dispatch(fetchCharacterDetail({
        characterId
      }));
    }
  }

  shouldComponentUpdate(nextProps) {
    const same = isEqual(this.props.detail, nextProps.detail);
    return !same;
  }

  render() {
    const {dispatch, characterId, detail} = this.props;
    return <CharacterDetail dispatch={dispatch} characterId={characterId} detail={detail} />
  }
}

CharacterDetailContainer.propTypes = propTypes;

const mapStateToProps = ({characters, characterDetail:detail}, props) => {
  return {
    detail: enhanceCharacterDetail({
      characters,
      detail
    }),
    characterId: Number(props.params.number)
  };
}

export default connect(mapStateToProps)(CharacterDetailContainer);
