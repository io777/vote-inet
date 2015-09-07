// publish Vote
Meteor.publish('Votes', function(){
	return Votes.find();
});