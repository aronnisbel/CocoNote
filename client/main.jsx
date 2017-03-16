import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
//import '../imports/api/textelements.js';
import { renderRoutes } from '../imports/startup/client/routes.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<App/ >, document.getElementById('react-root'));
});
