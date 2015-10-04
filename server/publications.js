// publish Vote
Meteor.publish('Votes', function(){
	return Votes.find();
});
// опубликовать один склад
Meteor.publish('singleVote', function(id) {
	check(id, String);
	return Votes.find(id);
});
// опубликовать всех пользователей
Meteor.publish('Users', function() {
	return Meteor.users.find();
});
// опубликовать одного пользователя
Meteor.publish('singleUser', function(id) {
	check(id, String);
		return Meteor.users.find(id);
});
// опубликовать роли
Meteor.publish(null, function (){ 
	return Meteor.roles.find({})
});