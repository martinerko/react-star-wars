import isEqual from 'lodash.isequal';

const compareCharactersState = (props, nextProps) => {
  //we have either finished the preload of voted characters
  if (props.votedCharactersLoaded !== nextProps.votedCharactersLoaded) {
    return true;
  }

  //or the order based on score has changed
  if (!isEqual(props.characters.order, nextProps.characters.order)) {
    return true;
  }
  //or something else must have changed
  return !isEqual(props.characters.data, nextProps.characters.data);
};

export { compareCharactersState };
