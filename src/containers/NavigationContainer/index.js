import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';

const propTypes = {
  dispatch: PropTypes.func.isRequired
}

class NavigationContainer extends Component {
  render() {
    const {dispatch} = this.props;

    return <Navigation dispatch={dispatch} />;
  }
}

NavigationContainer.propTypes = propTypes;

export default connect(null)(NavigationContainer);
