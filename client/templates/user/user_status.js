// Template.userStatus.users = function() {
// 	return Meteor.users.find({ "status.online": true })
// };

Template.userStatus.helpers({
	users: function () {
		return Meteor.users.find({ "status.online": true });
	},
	lastLoginDate: function(time) {
		return moment(time).format('DD.MM.YYYY, h:mm:ss');
	}
});
