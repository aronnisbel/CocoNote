import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import App from '../../ui/App.jsx';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper.jsx';
import NotFoundPage from '../../ui/NotFoundPage.jsx';

/*import AppContainer from '../../ui/containers/AppContainer.js';
import ListPageContainer from '../../ui/containers/ListPageContainer.js';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
import NotFoundPage from '../../ui/pages/NotFoundPage.js';
*/

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="app" component={App}/>
      <Route path="signin" component={AccountsUIWrapper}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);

/*
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Match path="/" component={App}>
      <IndexRoute component={App}/>
      <Match path="app" component={App}/>
      <Match path="signin" component={AccountsUIWrapper}/>
      <Match path="*" component={NotFoundPage}/>
    </Match>
  </Router>
);*/
