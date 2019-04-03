import '../imports/api/notes.js';
import '../imports/api/tasks.js';
import '../imports/api/todolists.js';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '162550288030364',
    secret: 'bc2eb1c65f45e8aeb45a59482ea0cd8a'
});

Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});
});
