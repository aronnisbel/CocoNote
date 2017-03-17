import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Todos = new Mongo.Collection('todolists');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('usertodos', function tasksPublication() {
    return Todos.find({
      $or: [
        { owner: this.userId},
        { owner: this.userId },
      ],
    });
  });
}
  
Meteor.methods({
  'todolists.insert'(text) {
   	check(text, String);

   	// Make sure the user is logged in before inserting a todolist
    	if (! Meteor.userId()) {
      		throw new Meteor.Error('not-authorized');
    	}

    	Todos.insert({
      	  topic: "",
          createdAt: new Date(),
      	  posX: 300,
      	  posY: 300,
      	  owner: Meteor.userId(),
      	  username: Meteor.user().username,
    	});
  },
  'todolists.remove'(todolistId) {
    check(todolistId, String);
    //todo: add meteor call to emove tasks with this listId
    Todos.remove(todolistId);
  },
  'todolists.setTopic'(todolistId, text) {
  	check(todolistId, String);

	Todos.update({
	  _id: todolistId}, {$set:{topic: text}});
  },
  'todolists.updatePosition'(todolistId, posx, posy){
                check(todolistId, String);
                Todos.update({
                  _id: todolistId},{$set:{posX: posx, posY: posy}});
  },
});
