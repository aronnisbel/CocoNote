import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {check } from 'meteor/check';

export const Textelements = new Mongo.Collection('textelements');

Meteor.methods({
    //Insert to the mongo db
    'textelements.insert' (text, createdAt, textId) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Textelements.insert({
            text,
            createdAt: new Date(),
            textId,
            //  owner: this.userId,
            //username: Meteor.users.findOne(this.userId).username,
        });
      },

  /*  //Update text...?
    Textelements.update(
      {_id: textId},
       { $set: {
            "text": text,
            "createdAt": new Date(),
            "textId": textId
        }
    })*/
    //Remove from mongo db
    'textelements.remove' (textId) {
        check(textId, String);

        if(!this.userId || !Meteor.user().profile.admin){
           throw new Meteor.Error('not-authorized');
         }

        Textelements.remove(textId);
    },


    //Textelements.update(textId, { $set: { checked: setChecked } });
    //},

});
