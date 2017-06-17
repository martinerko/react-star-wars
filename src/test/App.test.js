import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { App } from '../containers/App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should not render a `.loader` by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.loader')).to.have.length(0);
  });

  it('should render a `.loader` when showLoader property is passed', () => {
    const wrapper = shallow(<App showLoader />);
    expect(wrapper.find('.loader')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <App>
        <div className="children" />
      </App>
    );
    expect(wrapper.contains(<div className="children" />)).to.equal(true);
  });
});
