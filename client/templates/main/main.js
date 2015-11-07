// reactive table language
i18n.setLanguage('ru');

Template.main.helpers({
	voteCount: function () {
		return Votes.find().count();
	}
});