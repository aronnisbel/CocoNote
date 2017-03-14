import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const  Textelements = new Mongo.Collection('textelements');
Metor.methods({

   //Insert to the mongo db
   'textelements.insert'(text) {
     check(text, String);

     // Make sure the user is logged in before inserting a task
    /**if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }***/

   Textelements.insert({
      text,
      createdAt: new Date(),
      textId,
    //  owner: this.userId,
    //username: Meteor.users.findOne(this.userId).username,
    });
 },

 //Remove from mongo db
 'textelements.remove'(textId) {
   check(textId, String);

   Textelements.remove(textId);
 },

 //Update text...?


 'tasks.setChecked'(textId, setChecked) {
    check(textId, String);
    check(setChecked, Boolean);

    Textelements.update(taskId, { $set: { checked: setChecked } });
  },

});
