import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('usernotes', function notesPublication() {
    return Notes.find({
      $or: [
	{ owner: this.userId },
	{ owner: this.userId },
      ],
    });
  });
}
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
		  editmode: true,
		  owner: this.userId,
		  username: Meteor.users.findOne(this.userId).username,
		});
	},
	'notes.insertpos'(text, xxxx, yyyy) {
                check(text,String);

                // make sure user is logged in before inserting a task

                if (! this.userId) {
                        throw new Meteor.Error('not-authorized');
                }

                Notes.insert({
                  text,
                  createdAt: new Date(),
                  posX: xxxx,
                  posY: yyyy,
                  editmode: true,
                  owner: this.userId,
                  username: Meteor.users.findOne(this.userId).username,
                });

		
		
        },
	'notes.remove'(noteId) {
		check(noteId, String);
		Notes.remove(noteId);
	},
  'notes.updatePosition'(noteId, posx, posy){
    check(noteId, String);
    Notes.update({
      _id: noteId},{$set:{posX: posx, posY: posy}});
  },
	'notes.update'(noteId,texttoWrite) {
		check(noteId, String);
		check(texttoWrite, String)
		Notes.update( {
		  _id: noteId},{$set:{ text: texttoWrite, editmode: false}});
	},
	'notes.seteditmode'(noteId) {
		var newbool =
		check(noteId, String);
		Notes.update( {
		  _id: noteId},{$set:{editmode: true}});
	},
});
