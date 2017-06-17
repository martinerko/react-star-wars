import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateCharacterComment } from '../../actions/starwars';
import './index.css';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  characterId: PropTypes.number.isRequired
};

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.detail.comment
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {comment} = this.props.detail;
    if (comment !== nextProps.detail.comment) {
      this.setState({
        comment: nextProps.detail.comment
      });
    }
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {dispatch, detail: character} = this.props;
    const comment = this.characterComment.value;
    dispatch(updateCharacterComment(character, comment));
  }

  renderTitle() {
    const {name = 'Unknown...'} = this.props.detail;
    return <h1>Star Wars Heroe: {name}</h1>;
  }

  render() {
    const {name, image, score, height, mass, gender, updatingComment} = this.props.detail;
    const {hair_color, skin_color, eye_color, birth_year, planetInfo = {}} = this.props.detail;
    const {name: planetName} = planetInfo;

    return (
      <main className="info-page">
        {this.renderTitle()}
        <figure className="detail-image">
          <img className="img-responsive" src={image} alt={name} />
        </figure>
        <section className="detail-description">
          <details open>
            <summary>Characteristics:</summary>
            <ul>
              <li><div className="label">Score:</div>{score}</li>
              <li><div className="label">Planet:</div>{planetName}</li>
              <li><div className="label">Height:</div>{height}</li>
              <li><div className="label">Mass:</div>{mass}</li>
              <li><div className="label">Birth Year:</div>{birth_year}</li>
              <li><div className="label">Gender:</div>{gender}</li>
              <li><div className="label">Hair color:</div>{hair_color}</li>
              <li><div className="label">Skin color:</div>{skin_color}</li>
              <li><div className="label">Eye color:</div>{eye_color}</li>
            </ul>
          </details>
        </section>
        <section className="detail-comment">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="comment">Comment:</label>
            <textarea disabled={updatingComment} ref={node => this.characterComment = node} className={updatingComment ? 'form-control loader-small' : 'form-control'} rows="5" id="comment" required value={this.state.comment} onChange={this.handleChange} />
            <button disabled={updatingComment} type="submit" className="btn btn-default pull-right">Save</button>
          </form>
        </section>
      </main>
    )
  }
}

CharacterDetail.propTypes = propTypes;

export default CharacterDetail;
