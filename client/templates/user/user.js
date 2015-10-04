Template.userList.helpers({
	userCount: function () {
		return Meteor.users.find().count();
	}
});

Template.userList.helpers({
	settings: function () {
		return {
			collection: Meteor.users.find(),
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
				// { key: 'username', label: 'Имя пользователя', sortable: true},
				{ key: 'emails.0.address', label: 'Почтовый адрес', sortable: true},
				{ key: 'emails.0.verified', label: 'Email подтвержден', sortable: true},
				{ 
					key: 'services.password',
					headerClass: 'col-md-1',
					label: 'Установить пароль',
					sortable: false,
					fn: function (value){
						if(value){
							return new Spacebars.SafeString(
								'<a><i class="fa fa-lock fa-lg"></i></a>'
							);
						} else {
							return new Spacebars.SafeString(
								'<a><i class="fa fa-unlock fa-lg"></i></a>'
							);
						}
					}
				},
				{ 
					key: 'createdAt',
					label: 'Дата создания',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'vote', label: 'Голосование', sortable: true},
				{ key: 'roles', label: 'Роли', sortable: true},
				{ 
					key: 'status.lastLogin.date',
					label: 'Дата последнего входа', sortable: true, 
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY, h:mm:ss');
						}
					}
				},
				{ key: 'status.lastLogin.ipAddr', label: 'IP', sortable: true},
				{ key: 'status.lastLogin.userAgent', label: 'Данные пользователя', sortable: true}
			]
		};
	}
});

// edit User
Template.userList.events({
	'click .reactive-table tr': function (event) {
		// set the blog post we'll display details and news for
		event.preventDefault();
		var User = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-pencil fa-lg") {
			Router.go('updateUserForm', {_id: this._id});
		}
	}
});
// delete User
Template.userList.events({
	'click .reactive-table tr': function (event) {
		event.preventDefault();
		var User = this;
		// checks if the actual clicked element has the class `delete`
		if (event.target.className == "fa fa-times fa-lg") {
			Meteor.users.remove(User._id, function(error){
				if(error){
					alertify.error("Ошибка!", error);
					console.log("Remove Error:", error);
				} else {
					alertify.success("Пользователь успешно удален!");
					console.log("User Remove!");
				}
			});
		}
	}
});

// перенаправить на список после создания и изменения
AutoForm.addHooks(['insertUserForm', 'updateUserForm'], {
    onSuccess: function(insert, result) {
    	Router.go('userList');
        alertify.success("Пользователь успешно добавлен!");
        console.log("Insert Result:", result);
    },
    onError: function(insert, error) {
    	if (error) {
        	if(error.error === 409){
				alertify.error("Такое имя пользователя или почтовый адресс уже существуют!");
			} else {
	        	alertify.error("Ошибка!", error);
	          	console.log("Insert Error:", error);
	        }
        }
    },
    onSuccess: function(update, result) {
    	Router.go('userList');
        alertify.success("Пользователь успешно изменен!");
        console.log("Updated!");
    },
    onError: function(update, error) {
    	if (error) {
        	if(error.error === 409){
				alertify.error("Такое имя пользователя или почтовый адресс уже существуют!");
			} else {
	        	alertify.error("Ошибка!", error);
	        	console.log("Update Error:", error);
	        }
        }
    },
});

// установить пароль пользователя
Template.setPasswordForm.events({
	'submit form': function(e) {
		e.preventDefault();
		var data = {
			password: $(e.target).find('[name=password]').val(),
			user_id: this._id
		};
		if (data.password !== '') {
			Meteor.call('addPassword', data, function(error, result) {
			  // display the error to the user and abort
				if (error){
					alertify.error("Ошибка!", error);
					console.log("Insert Error:", error);
				} else {
					Router.go('userList');
					alertify.success("Пароль пользователя успешно обновлен!");
				}
			});
		}
	}
});

// установить пароль пользователя
Template.userList.events({
  'click .reactive-table tr': function (event) {
	event.preventDefault();
	var User = this;
	// checks if the actual clicked element has the class `delete`
	if (event.target.className == "fa fa-unlock fa-lg" || 
		event.target.className == "fa fa-lock fa-lg") {
			Router.go('setPasswordForm', {_id: this._id});
	}
  }
});