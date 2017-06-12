// src/constants/defineAction.js
export default (mainAction, subactions = []) => {
  if (typeof subactions === 'string') {
    subactions = [subactions];
  }

  return subactions.reduce((res, subAction) => Object.assign({}, res, {
    [subAction]: `${mainAction}_${subAction}`
  }), {
    'ACTION': mainAction
  });
};
