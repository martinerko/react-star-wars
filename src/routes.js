import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import CharactersContainer from './containers/CharactersContainer';
import SearchedCharactersContainer from './containers/SearchedCharactersContainer';
import CharacterDetailContainer from './containers/CharacterDetailContainer';
import About from './components/About';
import Planets from './components/Planets';

const routes = (
<Route path="/" component={App}>
    <IndexRoute component={CharactersContainer}/>
    <Route exact path="/character/:number" component={CharacterDetailContainer}/>
    <Route exact path="/search" component={SearchedCharactersContainer}/>
    <Route exact path="/planets" component={Planets}/>
    <Route exact path="/about" component={About}/>
  </Route>
);

export default routes;
