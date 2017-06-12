import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';

import Search from '../Search';
import './index.css';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class Navigation extends Component {
  render() {
    const {dispatch} = this.props;

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar1">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeClassName="active">Characters</IndexLink></li>
              <li><Link to="about" activeClassName="active">About</Link></li>
            </ul>
            <Search dispatch={dispatch}/>
          </div>
        </div>
      </nav>
    )
  }
}

Navigation.propTypes = propTypes;

export default Navigation;
