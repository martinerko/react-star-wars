import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertContainer from 'react-alert';
import reduce from 'lodash.reduce';

import NavigationContainer from '../NavigationContainer';

const propTypes = {
  errors: PropTypes.array,
  showLoader: PropTypes.bool,
  children: PropTypes.element.isRequired
}

class App extends Component {
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 30000,
    type: 'error',
    transition: 'scale'
  }

  componentDidUpdate() {
    const {errors} = this.props;
    errors.forEach(item => {
      this.alertBox.show(item.message, {
        type: 'error'
      });
    });
  }

  render() {
    const {showLoader, children, errors} = this.props;
    return (
      <div>
        <NavigationContainer />
        <div className="container">
          {children}
        </div>
        {showLoader ? <div className="loader" /> : null}
        {errors.length ? <AlertContainer ref={node => this.alertBox = node} {...this.alertOptions} /> : null}
      </div>
    )
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => {
  const showLoader = reduce(state, (showLoader, item) => showLoader || item.isFetching, false);
  const errors = Object.keys(state).map(key => state[key].error).filter(item => item);
  return {
    showLoader,
    errors
  };
}

export default connect(mapStateToProps)(App);
