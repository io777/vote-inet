Template.vote_layout.onRendered(function () {
	$(".button-collapse").sideNav();
	$(".dropdown-button").dropdown();
});

// i18n.setLanguage('ru');
// T9n.setLanguage("ru", {
// 	error: {
// 		accounts: {
// 			"Invalid email": "Несуществующий Email"
// 		}
// 	}
// });

Template.vote_layout.helpers({
	voteTrue: function(){
		if(Meteor.user().vote) {
			if(Meteor.user().vote == true){
				return false;
			} 
		} else {
			return true;
		}
	},
	userEmail: function() {
		return Meteor.user().emails[0].address;
	}
});