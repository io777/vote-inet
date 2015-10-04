Template.main.helpers({
	voteCount: function () {
		return Votes.find().count();
	}
});