import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount, render } from 'enzyme';

import CharacterCard from '../components/CharacterCard';

chai.use(chaiEnzyme());

const character = {
  id: 1,
  name: 'Luke Skywalker',
  score: 0,
  updatingScore: false
};

const dispatch = () => {
};

const props = {
  character,
  dispatch
};

describe('<CharacterCard />', () => {
  it('renders without crashing', () => {
    shallow(<CharacterCard {...props} />);
  });

  // it('should not render a `.loader` by default', () => {
  //   const wrapper = shallow(<App />);
  //   expect(wrapper.find('.loader')).to.have.length(0);
  // });
  //
  it('should render disabled downvote button when score is 0', () => {
    const wrapper = shallow(<CharacterCard {...props} />);
    expect(wrapper.find('.fa-thumbs-down')).to.be.disabled();
  });

  it('should not render disabled downvote button when score is 1', () => {
    const score1 = {
      ...props.character,
      score: 1
    };
    const wrapper = shallow(<CharacterCard {...props} character={score1} />);
    expect(wrapper.find('.fa-thumbs-down')).to.not.be.disabled();
  });

  it('should render disabled upvote when score is being updated', () => {
    const updatingScore = {
      ...props.character,
      updatingScore: true
    };
    const wrapper = shallow(<CharacterCard {...props} character={updatingScore} />);
    expect(wrapper.find('.fa-thumbs-up')).to.be.disabled();
  });

  it('should not render disabled upvote when score is not being updated', () => {
    const wrapper = shallow(<CharacterCard {...props} character={character} />);
    expect(wrapper.find('.fa-thumbs-up')).to.not.be.disabled();
  });

  it('should render a `.score` with value 10', () => {
    const score10 = {
      ...props.character,
      score: 10
    };
    const wrapper = shallow(<CharacterCard {...props} character={score10} />);
    expect(wrapper.find('.score').text()).to.equal('10');
  });
});
