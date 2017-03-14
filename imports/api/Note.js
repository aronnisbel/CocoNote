import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(text){
    check(text, String);

    Notes.insert({
      text,
      createdAt: new Date(),
    });
  },
  'notes.remove'(noteId){
    check(noteId, String);

    Notes.remove(noteId);
  },
});
