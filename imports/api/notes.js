import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

 
export const Notes = new Mongo.Collection('notes');

Meteor.methods({
	'notes.insert'(text) {
		check(text,String);

		// make sure user is logged in before inserting a task

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		
		Notes.insert({
		  text,
		  createdAt: new Date(),
		  posX: 300,
		  posY: 300,
		  owner: this.userId,
		  username: Meteor.users.findOne(this.userId).username,
		});
	},
	'notes.remove'(noteId) {
		check(noteId, String);
		Notes.remove(noteId);
	},
});
