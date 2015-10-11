// Template.vote.onRendered(function () {
// 	 $('select').material_select();
// });

Template.voteList.helpers({
	voteCount: function () {
		return Votes.find().count();
	}
});

Template.voteList.helpers({
	settings: function () {
		return {
			collection: Votes,
			rowsPerPage: 10,
			showFilter: true,
			class: 'responsive-table',
			fields: [
				{ 
					key: 'delete',
					//headerClass: 'col-md-1',
					label: 'Удалить',
					hideToggle: true,
					sortable: false,
					// hidden: function () {
					// 	var loggedInUser = Meteor.user();
					// 	if (!Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
					// 		return true;
					// 	}
					// },
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-times fa-lg"></i></a>');
					}
				},
				{ 
					key: 'edit',
					//headerClass: 'col-md-1',
					label: 'Изменить / посмотреть',
					sortable: false,
					fn: function (value){
						return new Spacebars.SafeString('<a><i class="fa fa-pencil fa-lg"></i></a>');
					}
				},
				{ key: 'house', label: 'Дачный коопертив', sortable: true},
				{ key: 'speed', label: 'Какая скорость', sortable: true},
				{ key: 'money', label: 'Сколько денег готовы платить', sortable: true},
				{ key: 'pay', label: 'Способ оплаты', sortable: true },
				{ key: 'technology', label: 'Текущая технология', sortable: true},
				{ key: 'likeCurrentInet', label: 'Устраивает текущий интернет', sortable: true}
			]
		};
	}
});

// edit vote
Template.voteList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var Vote = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateVoteForm', {_id: this._id});
		}
	}
});
// delete vote
Template.voteList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var Vote = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
			Votes.remove(Vote._id, function(error){
				if(error){
					alertify.error("Ошибка!", error);
					console.log("Remove Error:", error);
				} else {
					alertify.success("Голос успешно удален!");
					console.log("Vote Remove!");
				}
			});
		}
	}
});
// redirect on list after create and edit
AutoForm.addHooks(['insertVoteForm', 'updateVoteForm'], {
	after: {
		insert: function(error, result) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Insert Error:", error);
			} else {
				if (Roles.userIsInRole(Meteor.user(), ['admin','moderator'])) {
					Router.go('voteList');
				} else {
					Router.go('voteResult');
				}
				alertify.success("Голос успешно добавлен!");
				console.log("Insert Result:", result);
				Meteor.users.update({_id: Meteor.userId()}, {$set: {vote: true}}, function(error, result){
					if (error) {
						console.log("Insert Error:", error);
					} else {
						console.log("Insert Result:", result);
					}
				});
			}
		},
		update: function(error) {
			if (error) {
				alertify.error("Ошибка!", error);
				console.log("Update Error:", error);
			} else {
				if (Roles.userIsInRole(Meteor.user(), ['admin','moderator'])) {
					Router.go('voteList');
				} else {
					Router.go('voteResult');
				}
				alertify.success("Голос успешно изменен!");
				console.log("Updated!");
			}
		}
	}
});