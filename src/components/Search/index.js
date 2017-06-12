import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchCharacters, resetSearch } from '../../actions/search';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {dispatch} = this.props;
    const searchTerm = this.searchInput.value;
    this.searchInput.value = ''; //cleanup

    dispatch(resetSearch());
    dispatch(searchCharacters({
      searchTerm
    }));
  }

  render() {
    return (
      <form className="navbar-form navbar-right" role="search" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="search" ref={node => this.searchInput = node} className="form-control pull-right" placeholder="Search" required />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">
            <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    )
  }
}

Search.propTypes = propTypes;

export default Search;
